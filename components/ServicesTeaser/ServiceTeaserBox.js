import { useEffect, useRef } from "react";
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ServiceTeaserBox.module.scss"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"
import { getMediaURL } from "../../lib/api"
import useWindowSize from "../../hooks/useWindowSize";

const ServiceTeaserBox = ({ service, videoRight }) => {
    const url = getMediaURL() + service.image.data.attributes.url;

    const cref = useRef(null);
    const dispatch = useGlobalDispatchContext();
    const { cursorStyles } = useGlobalStateContext();
    const { layoutRendered } = useGlobalStateContext();
    const windowSize = useWindowSize();

    const onCursor = cursorType => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
    }

    useEffect(() => {
        if (layoutRendered) {
            if (windowSize.width > process.env.breakpoints.tablet) {
                const q = gsap.utils.selector(cref);
                const containerText = q(`.${styles.containerText}`);
                const tl = gsap.timeline({ paused: true });
                tl.from(containerText, { y: 200, ease: 'none', duration: 1 })
                    .to(containerText, { y: -200, ease: 'none', duration: 1 });
                ScrollTrigger.create({
                    trigger: cref,
                    start: 'top bottom', // top => trigger bottom => viewport 
                    end: 'bottom top', // top => trigger top => viewport 
                    animation: tl,
                    scrub: true
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutRendered]);

    return (
        <div ref={el => cref = el} className={`${styles.containerService} ${(!videoRight) ? styles.videoLeft : ''}`} >
            <div className={styles.serviceVideo}>
                <div className={styles.containerVideo}>
                    <video autoPlay muted loop playsInline>
                        <source type="video/mp4" src={url} />
                    </video>
                </div>
            </div>
            <div className={`${styles.serviceText} ${(videoRight) ? styles.alignRight : styles.alignLeft} ${(videoRight) ? 'content-padding-left' : 'content-padding-right'}`}>
                <div className={`${styles.containerText} ${(videoRight) ? styles.alignRight : ''}`}>
                    <div className={styles.title}>{service.title}</div>
                    <div className={styles.service}>{service.service}</div>
                    <div className={styles.text}>{service.text}</div>
                    <div className={`${styles.containerLink} ${(videoRight) ? styles.alignRight : ''}`}>
                        <div className={styles.link}>
                            <Link href={`/${service.link}`}>
                                <a
                                    onMouseEnter={() => {
                                        onCursor("hovered");
                                        const q = gsap.utils.selector(cref);
                                        gsap.to(q(`.${styles.informationLinkArrow}`), 1, { x: 30, ease: Power3.easeOut });
                                        gsap.to(q(`.${styles.informationLinkArrowMask}>img`), 1, { x: -135, ease: Power3.easeOut });
                                    }}
                                    onMouseLeave={() => {
                                        onCursor();
                                        const q = gsap.utils.selector(cref);
                                        gsap.to(q(`.${styles.informationLinkArrow}`), 1, { x: 0, ease: Power3.easeOut });
                                        gsap.to(q(`.${styles.informationLinkArrowMask}>img`), 1, { x: -88, ease: Power3.easeOut });
                                    }}>
                                    {/*<span className={styles.informationLinkLabel}>{service.link_label}</span>*/}
                                    <span className={styles.informationLinkArrow}>
                                        <span className={styles.informationLinkArrowMask}>
                                            <img src="images/arrow-right.svg" alt={service.link_label} />
                                        </span>
                                    </span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceTeaserBox;