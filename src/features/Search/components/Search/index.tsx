import React, { useState } from 'react'
import styles from './Search.module.scss'
import SvgSelector from '$/assets/icons/SvgSelector'
import Card from '@/components/Card'
import SearchBtn from '@/components/SearchBtn'
import { useTranslations } from 'next-intl'

interface Props {
  data: any;
}

const Search = ({ data }: Props) => {
  const t = useTranslations("Search")
  const [activePlatform, setActivePlatform] = useState('taobao');

  const handleButtonClick = (platform: any) => {
    setActivePlatform(platform);
  };

  return (
    <>
        <div className={styles.search}>
          <div className='container'>
            <div className={styles.search__inner}>
                <div className={styles.search__media}>
                    <div className={styles.search__platform}>
                      <h2>{t('platform')}:</h2>
                      <button
                          className={`${styles.search__platform_btn} ${activePlatform === 'alibaba' ? styles.active : ''}`}
                          onClick={() => handleButtonClick('alibaba')}
                      >
                          <SvgSelector id="1688-svg"/>
                          <span>1688</span>
                      </button>

                      <button
                        className={`${styles.search__platform_btn} ${
                          activePlatform === "taobao" ? styles.active : ""
                        }`}
                        onClick={() => handleButtonClick("taobao")}
                      >
                        <SvgSelector id="taobao-svg" />
                        <span>TaoBao</span>
                      </button>
                    </div>

                    <div className={styles.search__btn}>
                        <SearchBtn />
                    </div>

                    <div className={styles.search__top}>
                        {/* <div className={styles.search__nav}>
                            <button>Lorem ipsum</button>
                            <button>Lorem ipsum</button>
                            <button>Lorem ipsum</button>
                            <button>Lorem ipsum</button>
                        </div> */}

                        <div className={styles.search__btns}>
                            <button><span>{t("sales")}</span> <SvgSelector id="sorting-svg"/></button>
                            <button><span>{t("reputation")}</span> <SvgSelector id="settings-svg"/></button>
                            <button><span>{t("longPrice")}</span> <SvgSelector id="sorting-svg"/></button>
                            <button><span>{t("downPrice")}</span> <SvgSelector id="settings-svg"/></button>
                        </div>
                    </div>
                </div>

                <div className={styles.search__cards}>
                    {data?.map((el: any, idx: number) => (
                        <Card key={el.id} data={el} />
                    ))}
                </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Search;
