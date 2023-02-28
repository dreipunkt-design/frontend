import { useEffect, useRef } from "react";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion"
import styles from "./InformationBoxTextScrub.module.scss"
import { useGlobalStateContext } from "../../context/appContext"

const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const InformationBoxTextScrub = ({ information }) => {
  const cref = useRef(null);
  const { layoutRendered } = useGlobalStateContext();

  useEffect(() => {
    if (layoutRendered) {
      const q = gsap.utils.selector(cref);
      const containerTrigger = q(`.${styles.informationBoxContainerInner}`);
      gsap.set(q(`.${styles.informationBoxContent}`), { opacity: 0, y: '15vh' });
      const tm = gsap.timeline({ paused: true });
      tm.to(q(`.${styles.informationBoxContent}`), { opacity: 1, y: 0, ease: 'none', duration: .33 })
        .to(q(`.${styles.informationBoxContent}`), { y: '-7vh', ease: 'none', duration: .33 })
        .to(q(`.${styles.informationBoxContent}`), { opacity: 0, y: '-15vh', ease: 'none', duration: .33 });
      ScrollTrigger.create({
        trigger: cref,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: containerTrigger,
        animation: tm,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutRendered]);

  return (
    <>
      <section ref={el => cref = el}>
        <motion.div className={`${styles.informationBoxContainer} content-padding `}
          exit={{ opacity: 0 }}
          transition={transition_opacity}
        >
          <div className={styles.informationBoxContainerInner}>
            <div className={styles.informationBoxContent}>
              <div className={`${styles.title}`}>{information.title}</div>
              <div className="break"></div>
              <div className={styles.information}>{information.text}</div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default InformationBoxTextScrub
