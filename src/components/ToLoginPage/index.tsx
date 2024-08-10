import React from 'react'
import styles from "./ToLoginPage.module.scss"
import { Button } from '@/ui'
import { useTranslations } from 'next-intl'

const ToLoginPage = () => {
    const t = useTranslations("ToLoginPage")
  return (
    <div className={styles.tologin}>
        <div className={styles.tologin__inner}>
            <h2>{t("title")}</h2>
            <p>{t("text")}</p>
            <div className={styles.tologin__btns}>
                <Button
                    href="/auth?step=signin"
                    size='large'
                    className="generalbtn"
                    label={t("btn_access")}
                />

                <Button
                    href="/auth?step=signUp"
                    size='large'
                    className="line_btn"
                    label={t("btn_regist")}
                />
            </div>
        </div>
    </div>
  )
}

export default ToLoginPage