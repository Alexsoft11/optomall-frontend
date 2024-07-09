import PageLayout from "@/components/Layout/PageLayout";
import { ProductDetailSection } from "@/features/ProductDetail";
import { LoadingSpinner } from "@/ui/Spin";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const data = {
  detail: {
    id: "615179398072",
    title:
      "Polo erkaklar va ayollar uchun, yozgi bolalar qisqa qisma futbolkasi, paxta tepasi, bolalar kiyimlari uchun",
    price: 96000,
    discounted_price: 84000,
    discount_percentage: 12,
    image:
      "https://img.alicdn.com/imgextra/i1/3344616231/O1CN0117gIMw1vtqhfY4xkH_!!3344616231.jpg",
    quantity: 16200,
    description:
      '<div><img src="https://img.alicdn.com/imgextra/i1/O1CN016hx1RI1ykB5AeVtJ7_!!6000000006616-0-tps-750-128.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN012RdWRf1vtqcylObk4_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i1/3344616231/O1CN01LWK18L1vtqctvUSw1_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN01lTrTvF1vtqcylPgJ2_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN01zMy2L41vtqd0yYzus_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i2/3344616231/O1CN01ClnYBs1vtqd0ybLS6_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN01ZOBrb31vtqdCEz7Q5_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i2/3344616231/O1CN01G6yTZk1vtqctvYtPS_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i2/3344616231/O1CN01GGiRhR1vtqctvXorJ_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN01jOEJ751vtqd4zE5Kv_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i2/3344616231/O1CN01MHzWcA1vtqd8MX6fR_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN01bSLPBS1vtqctvVChM_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i1/3344616231/O1CN01MGIiiq1vtqctvVwRn_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN01RTXXRj1vtqctvYgwm_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i1/3344616231/O1CN01bekYMt1vtqd0yZXCp_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i4/3344616231/O1CN01Fl3XrR1vtqd4zDgPF_!!3344616231.jpg" /></div><div><img src="https://img.alicdn.com/imgextra/i3/3344616231/O1CN01m0LB801vtqd6iccC7_!!3344616231.jpg" /></div>',
    pictures: [
      {
        image_url:
          "https://img.alicdn.com/imgextra/i1/3344616231/O1CN0117gIMw1vtqhfY4xkH_!!3344616231.jpg",
        is_main: true,
      },
      {
        image_url:
          "https://img.alicdn.com/imgextra/i4/3344616231/O1CN01I6siaJ1vtqhhaDnpW_!!3344616231.jpg",
        is_main: false,
      },
      {
        image_url:
          "https://img.alicdn.com/imgextra/i3/3344616231/O1CN01Zzwub91vtqhdMdraL_!!3344616231.jpg",
        is_main: false,
      },
      {
        image_url:
          "https://img.alicdn.com/imgextra/i3/3344616231/O1CN012N8emn1vtqhiQ4T4h_!!3344616231.jpg",
        is_main: false,
      },
      {
        image_url:
          "https://img.alicdn.com/imgextra/i3/3344616231/O1CN01rRQEuZ1vtqhenTm5p_!!3344616231.jpg",
        is_main: false,
      },
    ],
    location: "Zhejiang",
    product_url: "https://item.taobao.com/item.htm?id=615179398072",
    videos: [
      {
        PreviewUrl:
          "https://img.alicdn.com/imgextra/i1/3344616231/O1CN0117gIMw1vtqhfY4xkH_!!3344616231.jpg",
        Url: "https://cloud.video.taobao.com/play/u/3344616231/p/2/e/6/t/1/400095291911.mp4?appKey=38829",
      },
    ],
    colors: [
      {
        id: 59,
        propertyName: "Rang bilan saralash",
        value: "618 oq",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01Zzwub91vtqhdMdraL_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01Zzwub91vtqhdMdraL_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "782918798",
      },
      {
        id: 60,
        propertyName: "Rang bilan saralash",
        value: "618 qora",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i2/3344616231/O1CN01M9v2mK1vtqhbkArOE_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i2/3344616231/O1CN01M9v2mK1vtqhbkArOE_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "712648055",
      },
      {
        id: 61,
        propertyName: "Rang bilan saralash",
        value: "618 qizil",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01rRQEuZ1vtqhenTm5p_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01rRQEuZ1vtqhenTm5p_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "836414039",
      },
      {
        id: 62,
        propertyName: "Rang bilan saralash",
        value: "618 ko'k ko'k",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01I6siaJ1vtqhhaDnpW_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01I6siaJ1vtqhhaDnpW_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "819336792",
      },
      {
        id: 63,
        propertyName: "Rang bilan saralash",
        value: "618 pushti",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01o8VFhk1vtqhaDzEMx_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01o8VFhk1vtqhaDzEMx_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "1890772686",
      },
      {
        id: 64,
        propertyName: "Rang bilan saralash",
        value: "618 apelsin",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01q2l5iq1vtqhdMhclp_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01q2l5iq1vtqhdMhclp_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "1088582306",
      },
      {
        id: 65,
        propertyName: "Rang bilan saralash",
        value: "618 kulrang kulrang",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN016p1EE41vtqhadDKsL_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN016p1EE41vtqhadDKsL_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "712648057",
      },
      {
        id: 66,
        propertyName: "Rang bilan saralash",
        value: "618 yashil",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN012N8emn1vtqhiQ4T4h_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN012N8emn1vtqhiQ4T4h_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "782918799",
      },
      {
        id: 67,
        propertyName: "Rang bilan saralash",
        value: "618 sariq",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01em2J4E1vtqhdMgcGG_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01em2J4E1vtqhdMgcGG_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "7321538",
      },
      {
        id: 68,
        propertyName: "Rang bilan saralash",
        value: "618 tibet ko'k rang",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01Baf9ko1vtqhc8qWR1_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01Baf9ko1vtqhc8qWR1_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "795924393",
      },
      {
        id: 69,
        propertyName: "Rang bilan saralash",
        value: "6 model",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01xMXNnm1vtqhwLJyk3_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01xMXNnm1vtqhwLJyk3_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "549490553",
      },
      {
        id: 70,
        propertyName: "Rang bilan saralash",
        value: "6 ta atirgul qizil",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01d1vQH91vtqhvCAdp5_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01d1vQH91vtqhvCAdp5_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "1540088858",
      },
      {
        id: 71,
        propertyName: "Rang bilan saralash",
        value: "6 tibet ko'k ranglar",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN010j37Wu1vtqhulx2sd_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN010j37Wu1vtqhulx2sd_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "756402130",
      },
      {
        id: 72,
        propertyName: "Rang bilan saralash",
        value: "6 sariq sariq",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i2/3344616231/O1CN01hPQWzk1vtqhulwdyj_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i2/3344616231/O1CN01hPQWzk1vtqhulwdyj_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "630578179",
      },
      {
        id: 73,
        propertyName: "Rang bilan saralash",
        value: "6 ta qora",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01HcEYnS1vtqhyoqESS_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01HcEYnS1vtqhyoqESS_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "498110480",
      },
      {
        id: 74,
        propertyName: "Rang bilan saralash",
        value: "6 pushti pushti",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01HW2lNc1vtqhthvJsE_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i4/3344616231/O1CN01HW2lNc1vtqhthvJsE_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "1054358538",
      },
      {
        id: 75,
        propertyName: "Rang bilan saralash",
        value: "6 model",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01UEYlyj1vtqi1MTSzM_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01UEYlyj1vtqi1MTSzM_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "498110481",
      },
      {
        id: 76,
        propertyName: "Rang bilan saralash",
        value: "6 qizil",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i2/3344616231/O1CN018e3Lw51vtqhzMrOjb_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i2/3344616231/O1CN018e3Lw51vtqhzMrOjb_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "805578891",
      },
      {
        id: 77,
        propertyName: "Rang bilan saralash",
        value: "6 kulrang",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01vFwbWs1vtqhp8SnX8_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01vFwbWs1vtqhp8SnX8_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "630578178",
      },
      {
        id: 78,
        propertyName: "Rang bilan saralash",
        value: "6 yashil",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01XzFzhV1vtqhum5q1C_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i1/3344616231/O1CN01XzFzhV1vtqhum5q1C_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "825036781",
      },
      {
        id: 79,
        propertyName: "Rang bilan saralash",
        value: "6 turdagi to'q sariq rang",
        imageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01X289IL1vtqhvCJyKl_!!3344616231.jpg",
        miniImageUrl:
          "https://gw.alicdn.com/bao/uploaded/i3/3344616231/O1CN01X289IL1vtqhvCJyKl_!!3344616231.jpg_600x600q90.jpg",
        propertyId: "1627207",
        valueId: "1161498535",
      },
    ],
    sizes: [
      {
        id: 1,
        value: "S",
      },
      {
        id: 2,
        value: "M ",
      },
      {
        id: 3,
        value: "L ",
      },
      {
        id: 4,
        value: "XL",
      },
      {
        id: 5,
        value: "2XL ",
      },
    ],
    composition: [],
  },
  score: {
    rating: "4.8",
    sold: null,
  },
  recommended: [
    {
      id: 761370801590,
      title:
        "Paxta bahorgi erkaklar va ayollar, bolalar mulki mulki mijozi ko'ylak, yuqori, 100% paxta uchun mos keladi",
      price: "12000",
      image:
        "https://img.alicdn.com/imgextra/i3/1115440534/O1CN01noYr4X1FocSKrVBbM_!!1115440534.jpg",
      discounted_price: null,
      discount_percent: null,
    },
    {
      id: 781555270694,
      title: "Ona uchun yozgi kiyimlar, keksa, g'arbiy uslubda o'rta asr uchun",
      price: "444000",
      image:
        "https://img.alicdn.com/imgextra/i3/742767021/O1CN013yPpgt21jfjEh1C5Q_!!0-item_pic.jpg",
      discounted_price: null,
      discount_percent: null,
    },
    {
      id: 714170103365,
      title: "Bolalar uchun paxta kuzgi ko'ylak",
      price: "48000",
      image:
        "https://img.alicdn.com/bao/uploaded/i2/119663525/O1CN01yi0kFM1buV0BSWk96_!!119663525.jpg",
      discounted_price: null,
      discount_percent: null,
    },
    {
      id: 730491555935,
      title: "Qizli qizlar quloqli bo'yoqli sochlar plyonkalik bosh kiyimi",
      price: "12000",
      image:
        "https://gw.alicdn.com/bao/uploaded/i4/3407837881/O1CN01y9pFtD285YFwkm44x_!!0-item_pic.jpg",
      discounted_price: null,
      discount_percent: null,
    },
    {
      id: 701557542804,
      title:
        "[Bepul etkazib berish] Chiqish liniyasi Braun Braun Bolalarning kiyimlari erkak qizning kiyimlari qiz qizi bosma jigarrang tana ko'ylagi Qisqa -lineevedy yozgi",
      price: "96000",
      image:
        "https://img.alicdn.com/imgextra/i3/6000000005708/O1CN01CPDjae1s2JYaROXA0_!!6000000005708-0-sm.jpg",
      discounted_price: null,
      discount_percent: null,
    },
  ],
};

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState<any>();
  const productId = params?.id;
  const { appendData: getProductsData, isLoading: isProductsLoading } =
    useQueryApiClient({
      request: {
        url: `product-detail-from-taobao?productId=${productId}`,
        method: "GET",
        disableOnMount: true,
      },
      onSuccess(res) {
        setProduct(res);
      },
    });

  useEffect(() => {
    if (productId) {
      getProductsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  const router = useRouter();

  const title = product?.detail.title;
  if (isProductsLoading) {
    return <LoadingSpinner />;
  }
  return (
    <PageLayout metaTitle={title}>
      {product ? (
        <ProductDetailSection
          product={product.detail}
          recommended={product.recommended}
        />
      ) : (
        <h2>No product found.</h2>
      )}
    </PageLayout>
  );
};

export default ProductDetail;
