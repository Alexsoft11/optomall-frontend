import * as React from 'react';
import { StyledSpin } from './style';

export interface LoadingSpinnerProps {
    spinning?: boolean;
    tip?: string;
    size?: 'small' | 'default' | 'large';
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    spinning = true,
    tip = 'Loading...',
    size = 'default',
    className,
  }) => {
    return (
      <StyledSpin className={className} spinning={spinning} tip={tip} size={size}>
        <div/>
      </StyledSpin>
    );
};  