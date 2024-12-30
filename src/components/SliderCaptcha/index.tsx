import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion"; // Fixed import for framer-motion
import styles from "./SliderCaptcha.module.scss";

interface SliderCaptchaProps {
  onVerify: (verified: boolean) => void;
}

const SliderCaptcha: React.FC<SliderCaptchaProps> = ({ onVerify }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Memoized event handlers for better performance
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isVerified && sliderRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPosition = Math.max(
          0,
          Math.min(e.clientX - sliderRect.left, sliderRect.width - 40) // Ensure the handle stays within bounds
        );
        setSliderPosition(newPosition);

        // Verification condition
        if (newPosition >= sliderRect.width - 45) {
          setIsVerified(true);
          onVerify(true);
        }
      }
    },
    [isVerified, onVerify]
  );

  const handleMouseUp = useCallback(() => {
    if (!isVerified) {
      setSliderPosition(0); // Reset position if not verified
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove, isVerified]);

  const handleMouseDown = useCallback(() => {
    if (!isVerified) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  }, [handleMouseMove, handleMouseUp, isVerified]);

  // Attach mouse events
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      if (slider) {
        slider.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.sliderContainer} ref={sliderRef}>
      {/* Background moves along with the slider */}
      <div
        className={styles.sliderBackground}
        style={{
          width: `${
            (sliderPosition / (sliderRef.current?.offsetWidth || 1)) * 100
          }%`,
        }}
      />
      {/* Slider Handle */}
      <motion.div
        className={styles.sliderHandle}
        style={{ x: sliderPosition }}
        drag={!isVerified ? "x" : false} // Disable dragging if verified
        dragConstraints={sliderRef}
        dragElastic={0}
      >
        {isVerified ? "✓" : "→"}
      </motion.div>
      {/* Verification text */}
      <div className={styles.sliderText}>
        <span>{isVerified ? "Verified" : "Slide to verify"}</span>
      </div>
    </div>
  );
};

export default SliderCaptcha;
