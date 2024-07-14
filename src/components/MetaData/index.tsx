import Head from "next/head";

interface MetaDataProps {
  title: string;
  description?: string;
  keywords?: string;
}

const MetaData = ({ title, description, keywords }: MetaDataProps) => (
  <Head>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <meta property="og:title" content={title} />
    {description && <meta property="og:description" content={description} />}
    <meta property="og:type" content="website" />
  </Head>
);

export default MetaData;
