"use client";

import CustomImage from "@/components/CustomImage";
import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  type Slide,
} from "yet-another-react-lightbox";

type Props = {
  slide: Slide;
  offset: number;
  rect: { width: number; height: number };
};

const isNextImage = (
  slide: Slide
): slide is Slide & { width: number; height: number } =>
  isImageSlide(slide) &&
  typeof (slide as any).width === "number" &&
  typeof (slide as any).height === "number";

export default function LightBoxImage({ slide, offset, rect }: Props) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();
  const { currentIndex } = useLightboxState();

  if (!isNextImage(slide)) {
    return (
      <CustomImage
        src={slide.src}
        alt={(slide as any).alt ?? ""}
        width={rect.width}
        height={rect.height}
        style={{ objectFit: "contain" }}
      />
    );
  }

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  const width = !cover
    ? Math.round(
      Math.min(rect.width, (rect.height / slide.height) * slide.width)
    )
    : rect.width;

  const height = !cover
    ? Math.round(
      Math.min(rect.height, (rect.width / slide.width) * slide.height)
    )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        src={slide.src}
        alt={slide.alt ?? ""}
        width={width}
        height={height}
        draggable={false}
        // placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
