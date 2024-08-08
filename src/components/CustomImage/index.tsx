import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { Skeleton } from "antd";

interface IProps {
  className?: string;
  imgClass?: string;
  src: string | StaticImageData;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  link?: string;
  isLink?: boolean;
  loading?: "lazy" | "eager";
  target?: "_blank" | "_parent" | "_self" | "_top";
  onClick?: any;
}

const CustomImage: FC<IProps> = ({
  className,
  imgClass,
  src,
  alt,
  fill = true,
  width,
  height,
  link,
  isLink = true,
  loading = "lazy",
  target = "_self",
  onClick,
}) => {
  const [isLoad, setIsLoad] = useState(false);

  const handleImageLoad = () => {
    setIsLoad(false);
  };

  const formatImageUrl = (url: string): string => {
    if (url.startsWith("//")) {
      return `https:${url}`;
    } else if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  };

  // Format the image URL
  const imgSrc = formatImageUrl(typeof src === "string" ? src : "");

  return (
    <div
      className={`${className} ${isLoad ? "blur" : "remove_blur"}`}
      onClick={onClick}
    >
      {isLoad && (
        <Skeleton.Button
          active
          className={className}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      )}
      {isLink ? (
        <Link href={link as string} target={target}>
          <Image
            src={imgSrc}
            className={imgClass}
            alt={alt}
            loading={loading}
            fill={fill}
            width={width}
            height={height}
            onLoad={handleImageLoad}
            onError={() => console.error(`Failed to load image: ${imgSrc}`)}
          />
        </Link>
      ) : (
        <Image
          className={imgClass}
          src={imgSrc}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleImageLoad}
          onError={() => console.error(`Failed to load image: ${imgSrc}`)}
        />
      )}
    </div>
  );
};

export default CustomImage;
