import React, { useState } from "react";
import { Button as AntdButton } from "antd";
import SvgSelector from "$/assets/icons/SvgSelector";
import { StyledButton } from './style';
import { LoadingSpinner } from "../Spin";

export interface ButtonProps {
  shape?: "circle" | "round";
  type?: "dashed" | "default" | "text" | "link" | "primary" | undefined;
  htmlType?: "button" | "reset" | "submit";
  block?: boolean;
  onClick?: any;
  size?: "large" | "middle" | "small";
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onTouchStart?: React.TouchEventHandler<HTMLSpanElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLSpanElement>;
  label?: React.ReactNode | string;
  danger?: boolean;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  title?: string;
  iconId?: React.ReactNode;
  iconPosition?: "left" | "right" | "top" | "bottom";
  style?: React.CSSProperties | undefined;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  disabled,
  label,
  className,
  type,
  shape,
  htmlType,
  onClick,
  block,
  size,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onTouchStart,
  onTouchEnd,
  danger,
  loading,
  title,
  iconId,
  iconPosition,
  style,
  icon,
  isLoading,
}: ButtonProps) => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setMouseCoords({ x: offsetX, y: offsetY });
  };

  const isLeftPosition = iconPosition === "left";
  const isRightPosition = iconPosition === "right";
  const isTopPosition = iconPosition === "top";
  const isBottomPosition = iconPosition === "bottom";

  const buttonClassName = `ant-btn ${className} ${
    shape === "circle" ? "circle" : shape === "round" ? "round" : "round"
  } ${className} ${size ? `ant-btn-${size}` : "ant-btn-middle"}`;

  const buttonStyle = {
    ...style,
    "--mouse-x": `${mouseCoords.x}px`,
    "--mouse-y": `${mouseCoords.y}px`,
    flexDirection: isTopPosition ? "column" : isBottomPosition ? "column-reverse" : undefined,
  } as React.CSSProperties;

  return (
    <StyledButton
      disabled={disabled}
      className={buttonClassName}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      block={block}
      size={size}
      shape={shape}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      danger={danger}
      loading={loading}
      title={title}
      icon={icon ? icon : isRightPosition ? undefined : null}
      style={buttonStyle}
      onMouseMove={handleMouseMove}
    >
      {(isLeftPosition || isTopPosition) && <SvgSelector id={String(iconId)} />}
      
      {isLoading ? (
        <LoadingSpinner className="products_spin" spinning={true} size="large" />
      ) : (
        !!label && <span className="text">{label}</span>
      )}

      {(isRightPosition || isBottomPosition) && <SvgSelector id={String(iconId)} />}
    </StyledButton>
  );
};
