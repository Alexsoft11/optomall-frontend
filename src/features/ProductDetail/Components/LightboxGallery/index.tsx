"use client";

import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";
import type { Slide } from "yet-another-react-lightbox";
import LightBoxImage from "./LightBoxImage";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Rotate from "yet-another-react-lightbox/plugins/";

const Lightbox = dynamic(() => import("yet-another-react-lightbox").then(m => m.default), { ssr: false });

type ImageInput = string | { src: string; width?: number; height?: number; alt?: string; blurDataURL?: string };

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: ImageInput[];
  startIndex?: number;
};

export default function LightboxGallery({ isOpen, setIsOpen, images, startIndex = 0 }: Props) {
  const slides: Slide[] = images.map(i => (typeof i === "string" ? { src: i } : i));
  const canUseNext = slides.every(s => typeof (s as any).width === "number" && typeof (s as any).height === "number");

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={startIndex}
      slides={slides}
      plugins={[Zoom]}
      zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 1.5 }}
      render={{
        slide: LightBoxImage,
      }}
    />
  );
}
