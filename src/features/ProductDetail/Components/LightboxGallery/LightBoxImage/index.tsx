"use client";

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

const isNextImage = (slide: Slide): slide is Slide & { width: number; height: number } =>
  isImageSlide(slide) &&
  typeof (slide as any).width === "number" &&
  typeof (slide as any).height === "number";

export default function LightBoxImage({ slide, offset, rect }: Props) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();
  const { currentIndex } = useLightboxState();
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);
  if (!isNextImage(slide)) return null;

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / (slide as any).height) * (slide as any).width))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / (slide as any).width) * (slide as any).height))
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt={(slide as any).alt ?? ""}
        src={(slide as any).src}
        loading="eager"
        draggable={false}
        placeholder={(slide as any).blurDataURL ? "blur" : undefined}
        style={{ objectFit: cover ? "cover" : "contain", cursor: click ? "pointer" : undefined }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
      />
    </div>
  );
}
