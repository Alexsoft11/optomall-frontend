import Head from "next/head";
import { FC } from "react";

interface IProps {
  title: string;
  description?: string;
}

const MetaData: FC<IProps> = ({
  title = "TaoBao",
  description = "TaoBao",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default MetaData;
