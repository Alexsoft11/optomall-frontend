import React, { useEffect, useRef, useState } from 'react'
import styles from './SubmitBtn.module.scss'
import SvgSelector from '$/assets/icons/SvgSelector';
import anime from 'animejs';

interface Props {
    isLoading: boolean;
    isSuccess: boolean;
    isError?:boolean
    btnText: any;
    onSubmit?:any
}

const SubmitBtn = ({ isLoading, isSuccess,isError, btnText,onSubmit}: Props) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const animationRef = useRef<anime.AnimeInstance | null>(null);

    const resetButtonStyles = () => {
        const button = btnRef.current;
        if (button && animationRef.current) {
            button.style.backgroundColor = '';
            button.style.borderRadius = '';
            button.style.height = '';
            button.style.width = '';
            const progressBar = button.querySelector(`.${styles.progress_bar}`) as HTMLElement;
            if (progressBar) {
                progressBar.style.width = '';
                progressBar.style.height = '';
                progressBar.style.borderRadius = '';
                progressBar.style.backgroundColor = '';
            }
            const btnSvg = button.querySelector(`.${styles.btn_svg}`) as HTMLElement;
            if (btnSvg) {
                btnSvg.style.opacity = '';
            }
            const text = button.querySelector(`.${styles.text}`) as HTMLElement;
            if (text) {
                text.style.opacity = '';
            }
            animationRef.current.pause()
        }
    }

    useEffect(() => {
        if (isLoading &&!isSuccess && !isError ) {
            const button = btnRef.current;
            if (button) {
                animationRef.current = anime({
                    targets: button,
                    duration: 1300,
                    backgroundColor: "#ff4200",
                    borderRadius: 100,
                    height: 0,
                    easing: "easeInOutSine",
                    complete: () => {
                        animationRef.current = anime({
                            targets: button,
                            height: 11,
                            duration: 2000,
                        });
                        animationRef.current = anime({
                            targets: `.${styles.progress_bar}`,
                            width: 340,
                            duration: 2000,
                            easing: "linear",
                        complete: () => {
                            animationRef.current = anime({
                                targets: button,
                                width: 0,
                                height: 0,
                                duration: 1,
                            complete: () => {
                                animationRef.current = anime({
                                    targets: `.${styles.progress_bar}`,
                                    width: 50,
                                    height: 50,
                                    delay: 500,
                                    duration: 750,
                                    borderRadius: 80,
                                    backgroundColor: "#ff4200",
                                complete: () => {
                                    animationRef.current = anime({
                                        targets: `.${styles.btn_svg}`,
                                        opacity: 1,
                                    });
                                }
                                });
                            },
                            });
                        },
                        });
                    },
                });
                animationRef.current = anime({
                    targets: `.${styles.text}`,
                    opacity: 0,
                    duration: 1,
                });
            }
        }
    }, [isLoading])

    const handleClick = () => {
        if (!isSuccess) {
            resetButtonStyles();
        }
    };

  return (
    <div>
        <button className={styles.btn}  ref={btnRef} disabled={isSuccess} onClick={handleClick}>
            <div className={styles.text} onClick={onSubmit}>{btnText}</div>
            <div className={styles.progress_bar}></div>
            <div className={styles.btn_svg} >
                <SvgSelector id={isSuccess ? "submit-svg" : "submit-error"}/>
            </div>
        </button>
    </div>
  )
}

export default SubmitBtn