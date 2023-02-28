import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap"
import { motion } from "framer-motion"
import styles from "./InformationBoxHero.module.scss"
import { useGlobalStateContext } from "../../context/appContext"

const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const InformationBoxHero = ({ information }) => {
  const cref = useRef(null);
  const tl = useRef(null);
  const { layoutRendered } = useGlobalStateContext();

  useEffect(() => {
    if (layoutRendered) {
      const q = gsap.utils.selector(cref);
      gsap.to(q(`.${styles.informationBoxHeroContainer}`), {
        ease: Power3.easeOut,
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: q(`.${styles.informationBoxHeroContainer}`),
          start: "top top",
          end: "bottom",
          scrub: true,
          toggleActions: "play none none none"
        }
      });
    }
  }, [layoutRendered]);


  return (
    <>
      <section ref={el => cref = el}>
        <motion.div className={`${styles.informationBoxHeroContainer} content-padding`}
          exit={{ opacity: 0 }}
          transition={transition_opacity}
        >
          <div className={`${styles.title}`}>{information.title}</div>
          <div className="break"></div>
          <div className={styles.information}>{information.text}</div>
          <div className="break"></div>
        </motion.div>
      </section>
    </>
  )
}

export default InformationBoxHero
