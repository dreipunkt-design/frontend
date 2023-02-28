
import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ProjectStatementBox.module.scss"
import { useGlobalStateContext } from "../../context/appContext"

const ProjectStatementBox = ({ detail }) => {
    const cref = useRef(null);
    const { layoutRendered } = useGlobalStateContext();

    useEffect(() => {
        if (layoutRendered) {
            const q = gsap.utils.selector(cref);
            const tl = gsap.timeline({ paused: true });
            tl.from(q(`.${styles.information}`), { y: 20, opacity: 0, duration: 3, ease: Power3.easeOut });
            ScrollTrigger.create({
                trigger: cref,
                animation: tl,
                start: "top 40%",
                toggleActions: "play none none none"
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutRendered]);

    return (
        <section ref={el => cref = el}>
            <div className={`${styles.statementBoxBoxContainer} content-padding content-padding-top-text`}>
                <div className={styles.information}>{detail.text}</div>
            </div>
        </section>
    )
}

export default ProjectStatementBox;