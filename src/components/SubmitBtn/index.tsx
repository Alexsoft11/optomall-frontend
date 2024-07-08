import React, { useEffect, useRef, useState } from 'react'
import styles from './SubmitBtn.module.scss'
import SvgSelector from '$/assets/icons/SvgSelector';
import anime from 'animejs';

interface Props {
    isLoading: boolean;
    isDisable: boolean;
    isSuccess: boolean;
    btnText: any;
}

const SubmitBtn = ({ isLoading, isDisable, isSuccess, btnText}: Props) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const animationRef = useRef<anime.AnimeInstance | null>(null);

    useEffect(() => {
        if (isLoading) {
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
                            height: 10,
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

  return (  
    <div>
        <button className={styles.btn} type="submit" ref={btnRef} disabled={isDisable}>
            <div className={styles.text}>{btnText}</div>
            <div className={styles.progress_bar}></div>
            <div className={styles.btn_svg} >
                <SvgSelector id={isSuccess  ? "submit-svg" : "submit-error"}/>
            </div>
        </button>
    </div>
  )
}

export default SubmitBtn