import React, { ReactNode, useState } from 'react';
import { StyledTabs } from './style';

export interface TabsProps {
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  children?: ReactNode;
  className?: string;
  tabPosition?: 'left' | 'right' | 'top' | 'bottom';
}

export const CustomTabs = ({
  activeKey,
  onChange,
  children,
  className,
  tabPosition,
  ...restProps
}: TabsProps) => {

  return (
    <StyledTabs
      activeKey={activeKey}
      onChange={onChange}
      tabPosition={tabPosition}
      className={className}
      {...restProps}
    >
      {children}
    </StyledTabs>
  );
};