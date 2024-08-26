import React, { ReactNode } from "react";
import MetaData from "../MetaData";

interface IPageLayoutProps {
  children: ReactNode;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

const PageLayout = ({ metaTitle, metaDescription, metaKeywords, children }: IPageLayoutProps) => {
  return (
    <div>
      <MetaData
        title={metaTitle ?? "Optomall"}
        description={metaDescription}
        keywords={metaKeywords}
      />
      <div className="page_inner">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
