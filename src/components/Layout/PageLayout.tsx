import React, { ReactNode } from "react";
import MetaData from "../MetaData";

interface IPageLayoutProps {
  children: ReactNode;
  metaTitle?: string;
}
const PageLayout = ({ metaTitle, children }: IPageLayoutProps) => {
  return (
    <div>
      <MetaData title={metaTitle ?? "TaoBao"} />
      <div className="container">
        <div className="page_inner">
         {children}
        </div>
      </div>    
    </div>
  );
};

export default PageLayout;
