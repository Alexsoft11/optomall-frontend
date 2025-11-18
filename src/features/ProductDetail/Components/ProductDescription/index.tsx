import React from "react"
import styles from "./ProductDescription.module.scss"
import useQueryApiClient from "@/utils/useQueryApiClient"
import { useRouter } from "next/router"
import { LoadingSpinner } from "@/ui/Spin"
import CustomImage from "@/components/CustomImage"
import parse, { HTMLReactParserOptions, Element } from "html-react-parser"

const ProductDescription = ({ descImages = [] }: { descImages?: string[] }) => {
  const { query, locale } = useRouter()

  const { data: description, isLoading } = useQueryApiClient({
    request: {
      url: `product-detail-desc?productId=${query.id}&lang=${locale}&provider=${query.provider}`,
      method: "GET",
      disableOnMount: descImages.length > 0,
    },
  })

  const html = description?.desc?.detail_html || ""

  const htmlOptions: HTMLReactParserOptions = {
    replace: (node) => {
      if (node instanceof Element && node.name === "img") {
        const src = node.attribs.src
        const alt = node.attribs.alt || ""

        if (src) {
          return (
            <CustomImage
              src={src}
              alt={alt}
              width={800}
              height={600}
              fill={false}
              className={styles.detail_image}
              imgClass={styles.img}
              isLink={false}
              useProxy
            />
          )
        }
      }
    },
  }

  return (
    <>
      {descImages.length > 0 ? (
        <div className={styles.desc_images_local}>
          {descImages.map((el, idx) => (
            <CustomImage
              key={idx}
              src={el}
              alt="Product Image"
              className={styles.detail_image}
              imgClass={styles.img}
              isLink={false}
              loading="lazy"
              useProxy
            />
          ))}
        </div>
      ) : isLoading ? (
        <LoadingSpinner size="large" />
      ) : (
        <div className={styles.html_img}>{parse(html, htmlOptions)}</div>
      )}
    </>
  )
}

export default ProductDescription
