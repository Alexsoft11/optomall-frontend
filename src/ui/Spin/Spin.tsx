import * as React from "react";
import { StyledSpin } from "./style";
import { useTranslations } from "next-intl";

export interface LoadingSpinnerProps {
  spinning?: boolean;
  tip?: string;
  size?: "small" | "default" | "large";
  className?: string;
  fullscreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  spinning = true,
  tip,
  size = "default",
  className = "global",
  fullscreen,
}) => {
  const t = useTranslations("GLOBAL");

  return (
    <StyledSpin
      fullscreen={fullscreen}
      className={className}
      spinning={spinning}
      tip={tip && t(tip)}
      size={size}
    >
      <div />
    </StyledSpin>
  );
};
