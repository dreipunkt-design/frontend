import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion"
import styles from "./InformationBoxTextStandard.module.scss"
import { useGlobalStateContext } from "../../context/appContext"

const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const InformationBoxTextStandard = ({ information }) => {
  const cref = useRef(null);

  useEffect(() => {
    const q = gsap.utils.selector(cref);
    const tl = gsap.timeline({ paused: true });
    if (q(`.${styles.image}`).length)
      tl.from(q(`.${styles.image}`), { y: 20, opacity: 0, duration: .8, ease: Power3.easeOut });
    tl.from(q(`.${styles.title}`), { y: 20, opacity: 0, duration: .6, ease: Power3.easeOut }, .3)
      .from(q(`.${styles.information}`), { y: 20, opacity: 0, duration: .6, ease: Power3.easeOut });
    ScrollTrigger.create({
      trigger: cref,
      animation: tl,
      start: "top 40%",
      toggleActions: "play none none none"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section ref={el => cref = el}>
        <motion.div className={`${styles.informationBoxContainer} content-padding `}
          exit={{ opacity: 0 }}
          transition={transition_opacity}
        >
          <div className={styles.informationBoxContainerInner}>
            <div className={`${styles.title}`}>{information.title}</div>
            <div className="break"></div>
            <div className={styles.information}>{information.text}</div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default InformationBoxTextStandard
