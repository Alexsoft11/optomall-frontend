import React from "react";
import { Skeleton } from "antd";
import styles from "./Skeleton.module.scss";

// Product Detail Skeleton - Shows immediately while data loads
export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className={styles.productDetailSkeleton}>
      <div className="container">
        {/* Breadcrumb skeleton */}
        <div className={styles.breadcrumbSkeleton}>
          <Skeleton.Button active size="small" style={{ width: 100, height: 20 }} />
        </div>

        <div className={styles.productContent}>
          {/* Left side - Images */}
          <div className={styles.imagesSection}>
            {/* Thumbnail column */}
            <div className={styles.thumbnailColumn}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.thumbnailItem}>
                  <Skeleton.Node active className={styles.thumbnailSkeleton}>
                    <div className={styles.thumbnailPlaceholder} />
                  </Skeleton.Node>
                </div>
              ))}
            </div>
            {/* Main image - FIXED: Proper full-size placeholder */}
            <div className={styles.mainImage}>
              <Skeleton.Node active className={styles.mainImageSkeleton}>
                <div className={styles.mainImagePlaceholder} />
              </Skeleton.Node>
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className={styles.infoSection}>
            {/* Rating */}
            <div className={styles.ratingRow}>
              <Skeleton.Button active size="small" style={{ width: 150, height: 24 }} />
              <Skeleton.Button active size="small" style={{ width: 80, height: 24 }} />
            </div>

            {/* Title */}
            <Skeleton
              active
              title={{ width: "90%" }}
              paragraph={{ rows: 2, width: ["100%", "70%"] }}
            />

            {/* Specifications */}
            <div className={styles.specifications}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.specRow}>
                  <Skeleton.Button active size="small" style={{ width: 80, height: 20 }} />
                  <Skeleton.Button active size="small" style={{ width: 150, height: 20 }} />
                </div>
              ))}
            </div>

            {/* Price section */}
            <div className={styles.priceSection}>
              <Skeleton.Button active style={{ width: 120, height: 36 }} />
              <Skeleton.Button active size="small" style={{ width: 80, height: 24 }} />
            </div>

            {/* Order section */}
            <div className={styles.orderSection}>
              <Skeleton.Button active style={{ width: "100%", height: 48 }} />
              <Skeleton.Button active style={{ width: "100%", height: 48 }} />
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className={styles.tabsSection}>
          <div className={styles.tabButtons}>
            <Skeleton.Button active style={{ width: 120, height: 40 }} />
            <Skeleton.Button active style={{ width: 120, height: 40 }} />
          </div>
          <div className={styles.tabContent}>
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        </div>

        {/* Recommended products skeleton */}
        <div className={styles.recommendedSection}>
          <Skeleton.Button active style={{ width: 200, height: 28, marginBottom: 16 }} />
          <div className={styles.recommendedGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.productCard}>
                <Skeleton.Node active className={styles.productImageSkeleton}>
                  <div className={styles.productImagePlaceholder} />
                </Skeleton.Node>
                <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 1, width: ["60%"] }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Skeleton - For search results
export const SearchResultsSkeleton: React.FC = () => {
  return (
    <div className={styles.searchSkeleton}>
      <div className={styles.productsGrid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.productCard}>
            <Skeleton.Node active className={styles.productImageSkeleton}>
              <div className={styles.productImagePlaceholder} />
            </Skeleton.Node>
            <Skeleton
              active
              title={{ width: "80%" }}
              paragraph={{ rows: 2, width: ["100%", "50%"] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Home Skeleton - For home page products
export const HomeSkeleton: React.FC = () => {
  return (
    <div className={styles.homeSkeleton}>
      {/* Slider skeleton */}
      <div className={styles.sliderSkeleton}>
        <Skeleton.Node active className={styles.sliderImageSkeleton}>
          <div className={styles.sliderImagePlaceholder} />
        </Skeleton.Node>
      </div>
      {/* Products grid */}
      <div className={styles.productsGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.productCard}>
            <Skeleton.Node active className={styles.productImageSkeleton}>
              <div className={styles.productImagePlaceholder} />
            </Skeleton.Node>
            <Skeleton
              active
              title={{ width: "80%" }}
              paragraph={{ rows: 2, width: ["100%", "50%"] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
