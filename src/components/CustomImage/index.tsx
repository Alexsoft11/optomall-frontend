import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Skeleton } from "antd";

interface IProps {
  className: string;
  imgClass?: string;
  src: string | StaticImageData;
  alt: string;
  fill?: boolean;
  link?: string;
  isLink: boolean;
  loading?: "lazy" | "eager";
  target?: "_blank" | "_parent" | "_self" | "_top";
}

const CustomImage: FC<IProps> = ({
  className,
  imgClass,
  src,
  alt,
  fill = true,
  link,
  isLink = true,
  loading = "lazy",
  target = "_self",
}) => {
  const [isLoad, setIsLoad] = useState(true);

  const imgSrc = src ? src : "";
  return (
    <div className={`${className} ${isLoad ? "blur" : "remove_bluer"}`}>
      {isLoad && (
        <Skeleton.Button
          active
          className={className}
          style={{ display: "bloc", width: "100%", height: "100%" }}
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
            onLoad={() => setIsLoad(false)}
          />
        </Link>
      ) : (
        <Image
          className={imgClass}
          src={imgSrc}
          alt={alt}
          fill={fill}
          loading={loading}
          onLoad={() => setIsLoad(false)}
        />
      )}
    </div>
  );
};

export default CustomImage;
