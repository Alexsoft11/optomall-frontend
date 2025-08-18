"use client";

import { useState } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import Image from "next/image";

interface LightboxGalleryProps {
  currentImages: string[];
  startIndex?: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LightboxGallery({ currentImages, startIndex = 0, isOpen, setIsOpen }: LightboxGalleryProps) {

  return (
    <>


      {isOpen && (
        <SlideshowLightbox
          lightboxIdentifier="gallery"
          onClose={() => setIsOpen(false)}
          startingSlideIndex={startIndex}
          showThumbnails
          slideshowInterval={0}
        >
          {currentImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Slide ${index}`}
              width={1200}
              height={800}
              className="object-contain"
              data-lightboxjs="gallery"
            />
          ))}
        </SlideshowLightbox>
      )}
    </>
  );
}
