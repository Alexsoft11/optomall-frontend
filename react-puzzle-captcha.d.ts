declare module "react-puzzle-captcha" {
  import React from "react";

  interface VerifyProps {
    width: number;
    height: number;
    visible: boolean;
    onSuccess: () => void;
    onFail: () => void;
    onRefresh: () => void;
  }

  export const Verify: React.FC<VerifyProps>;
}
