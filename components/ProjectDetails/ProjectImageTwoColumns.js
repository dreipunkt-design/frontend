
import { useEffect, useRef } from "react"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ProjectImageTwoColumns.module.scss"
import StrapiImage from "../StrapiImage"
import { useGlobalStateContext } from "../../context/appContext"

const ProjectImageTwoColumns = ({ detail }) => {
  const cref = useRef(null);

  useEffect(() => {
    const q = gsap.utils.selector(cref),
      uncover = gsap.timeline({ paused: true });
    gsap.set(q(`.${styles.columnRight}`), { y: 100 })
    uncover.add('start')
      .fromTo(q(`.${styles.columnRight}`), { y: 100 }, { y: -200 }, 'start')
      .fromTo(q(`.${styles.columnLeft}`), { y: -100 }, { y: 200 }, 'start')

    ScrollTrigger.create({
      trigger: cref,
      start: 'top bottom',
      end: 'bottom top',
      animation: uncover,
      scrub: true
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={el => cref = el}>
      <div className={`${styles.imageTwoColumnsContainer} content-padding content-padding-top`}>
        <div className={styles.containerTwoColumns}>
          <div className={`${styles.containerTwoColumnsColumn} ${styles.columnLeft}`} >
            {detail.left.data && detail.left.data.map((image, index) => {
              let paddingTop = (index === 0) ? '' : 'content-padding-top';
              return (
                <div key={image.id} className={`${styles.containerTwoColumnsColumnInner}`}>
                  <div className={`${styles.imageContainer}`}>
                    <StrapiImage image={image} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className={`${styles.containerTwoColumnsColumn} ${styles.columnRight}`}>
            {detail.right.data && detail.right.data.map((image, index) => {
              let paddingTop = (index === 0) ? '' : 'content-padding-top';
              return (
                <div key={image.id} className={`${styles.containerTwoColumnsColumnInner}`}>
                  <div className={`${styles.imageContainer} ${paddingTop}`}>
                    <StrapiImage image={image} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectImageTwoColumns
