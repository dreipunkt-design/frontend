
import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ProjectInformationBox.module.scss"
import { useGlobalStateContext } from "../../context/appContext"

const ProjectInformationBox = ({ detail }) => {
    const cref = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        const q = gsap.utils.selector(cref);
        tl.current = gsap.timeline({ paused: true });
        tl.current.from(q(`.${styles.informationBoxBoxContainer}>h1`), .6, { y: 20, opacity: 0, ease: Power3.easeOut })
            .from(q(`.${styles.information}`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .5);
        ScrollTrigger.create({
            trigger: cref,
            animation: tl.current,
            start: "top 50%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        });
    }, []);

    return (
        <section ref={el => cref = el}>
            <div className={`${styles.informationBoxBoxContainer} content-padding content-padding-top-text`}>
                <h1>{detail.title}</h1>
                <div className={styles.information}>{detail.information}</div>
            </div>
        </section>
    )
}

export default ProjectInformationBox;