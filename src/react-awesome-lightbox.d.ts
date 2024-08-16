declare module "react-awesome-lightbox" {
  import * as React from "react";

  interface LightboxProps {
    images: { url: string }[];
    startIndex?: number;
    onClose?: () => void;
    doubleClickZoom?: number;
    
  }

  const Lightbox: React.FC<LightboxProps>;

  export default Lightbox;
}
