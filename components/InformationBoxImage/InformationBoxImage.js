import { useEffect, useRef } from "react";
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion"
import styles from "./InformationBoxImage.module.scss"
import { getMediaURL } from "../../lib/api";
import StrapiImage from "../StrapiImage"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const InformationBoxImage = ({ boxdata }) => {
  const cref = useRef(null);
  const tl = useRef(null);

  /*
  useEffect(() => {
      const q = gsap.utils.selector(cref);
      gsap.to(q(`.${styles.informationBoxImageContainer}`), {
        ease: Power3.easeOut,
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: q(`.${styles.informationBoxImageContainer}`),
          start: "top top",
          end: "bottom",
          scrub: true,
          toggleActions: "play none none none"
        }
      });
    
  }, []);
*/

  return (
    <>
      <section ref={el => cref = el}>
        <motion.div className={`${styles.informationBoxImageContainer} content-padding content-padding-top`}
          exit={{ opacity: 0 }}
          transition={transition_opacity}
        >
          <div className={styles.containerTwoColumns}>
            {boxdata.ImagePos === 'left' ?
              <>
                <div className={`${styles.containerTwoColumnsInner} ${styles.columnLeft}`}>
                  <StrapiImage image={boxdata.image.data} />
                </div>
                <div className={`${styles.containerTwoColumnsInner} ${styles.columnRight}`}>
                  <div className={styles.containerInformationRight} >
                    <div className={styles.title}>{boxdata.title}</div>
                    <div className={styles.text}>{boxdata.text}</div>
                    <div className={styles.description}>{boxdata.description}</div>
                  </div>
                </div>
              </>
              :
              <>
                <div className={`${styles.containerTwoColumnsInner} ${styles.columnLeft}`}>
                  <div className={styles.containerInformationLeft} >
                    <div className={styles.title}>{boxdata.title}</div>
                    <div className={styles.text}>{boxdata.text}</div>
                    <div className={styles.description}>{boxdata.description}</div>
                  </div>
                </div>
                <div className={`${styles.containerTwoColumnsInner} ${styles.columnRight}`}>
                  <StrapiImage image={boxdata.image.data} />
                </div>
              </>
            }
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default InformationBoxImage
