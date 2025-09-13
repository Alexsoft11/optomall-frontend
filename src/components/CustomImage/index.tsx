import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
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
  useProxy?: boolean;
  style?: React.CSSProperties;
  sizes?: string;
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
  isLink = false,
  loading = "lazy",
  target = "_self",
  onClick,
  useProxy = true,
  style,sizes
}) => {
  const [isLoad, setIsLoad] = useState(true);

  const handleImageLoad = () => {
    setIsLoad(false);
  };

  const getProxyUrl = (url: string): string => {
    const base = "https://proxy.optomall.uz/proxy/?url=";
    if (url.startsWith("//")) {
      return `${base}${encodeURIComponent(`https:${url}`)}`;
    } else if (url.startsWith("http://")) {
      return `${base}${encodeURIComponent(url.replace("http://", "https://"))}`;
    }
    return `${base}${encodeURIComponent(url)}`;
  };

  const formatImageUrl = (url: string): string => {
    if (useProxy) {
      return getProxyUrl(url);
    }
    if (url.startsWith("//")) {
      return `https:${url}`;
    } else if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  };

  const imgSrc =
    typeof src === "string" ? formatImageUrl(src) : (src as StaticImageData);

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
            unoptimized={useProxy}
            style={style}
            sizes={sizes}
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
          unoptimized={useProxy}
          style={style}
            sizes={sizes}

        />
      )}
    </div>
  );
};

export default CustomImage;
