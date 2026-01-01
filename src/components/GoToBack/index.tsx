import React, { Component, FC } from "react";
import Link from "next/link";
import { Breadcrumb, ConfigProvider } from "antd";
import { useTranslations } from "next-intl";
import { IGoToBack } from "../Types";
import SvgSelector from "$/assets/icons/SvgSelector";

const GoToBack: FC<IGoToBack> = ({
  pathArr,
  styles = { color: "" },
  backUrl,
}) => {
  const t = useTranslations("GLOBAL");
  let arr = [{ title: <Link href={"/"}>{t("home")}</Link> }];

  pathArr?.map((el: any) => {
    arr.push({
      title: el.path ? (
        <Link
          style={{ cursor: el.path ? "pointer" : "default" }}
          href={el.path}
          target={el.target}
        >
          {el.titleNotr ? el.titleNotr : t(el.title)}
        </Link>
      ) : (
        <p style={{ cursor: "pointer" }}>
          {el.titleNotr ? el.titleNotr : t(el.title)}
        </p>
      ),
    });
  });

  if (backUrl)
    arr = [
      { title: <Link href={backUrl}>{t("back")}</Link> },
      { title: <span></span> },
    ];

  return (
    <div className="go_to_back" data-aos="fade-up">
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              linkColor: styles?.color || "#000000",
              linkHoverColor: styles?.color || "#000000",
            },
          },
          token: {
            colorText: styles?.color || "#000000",
            colorBgTextHover: "none",
            fontSize: 16,
          },
        }}
      >
          <Breadcrumb
            separator={
              <SvgSelector className={"breadcrumb_icon"} id={"chevron-svg"} />
            }
            items={arr}
          />
      </ConfigProvider>
    </div>
  );
};

export default GoToBack;
