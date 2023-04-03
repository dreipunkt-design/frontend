
import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ProjectImageSingleColumn.module.scss"
import StrapiImage from "../StrapiImage"
import { useGlobalStateContext } from "../../context/appContext"
import { getMediaURL } from "../../lib/api"

const ProjectImageSingleColumn = ({ detail }) => {
  const cref = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const q = gsap.utils.selector(cref);
    const images = gsap.utils.toArray(q(`.${styles.imageContainer}`));
    images.forEach((element, i) => {
      tl.current = gsap.timeline({ paused: true });
      gsap.set(element, { scale: .95 })
      tl.current.from(element, .6, { y: 100, opacity: 0, ease: Power3.easeOut })
      ScrollTrigger.create({
        animation: tl.current,
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
      });
      const uncover = gsap.timeline({ paused: true })
      uncover.to(element, { scale: 1, ease: 'none' });
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: '+=100%',
        animation: uncover,
        scrub: true
      });
    });
  }, []);

  return (
    <section ref={el => cref = el}>
      <div className={`${styles.singleColumnContainer} content-padding content-padding-top`}>
        {detail.center.data && detail.center.data.map((image, index) => {
          let paddingTop = (index === 0) ? '' : 'content-padding-top';
          if (image.attributes.mime.indexOf('video') !== -1) {
            return (
              <div key={image.id} className={`${styles.singleColumnContainerInner} ${paddingTop}`}>
                <div className={`${styles.imageContainer}`}>
                  <video autoPlay muted loop playsInline>
                    <source type="video/mp4" src={getMediaURL() + image.attributes.url} />
                  </video>
                </div>
              </div>
            );
          }
          else
            return (
              <div key={image.id} className={`${styles.singleColumnContainerInner} ${paddingTop}`} style={{ maxWidth: image.attributes.width }}>
                <div className={`${styles.imageContainer}`}>
                  <StrapiImage image={image} />
                </div>
              </div>
            )
        })}
      </div>
    </section >
  )
}

export default ProjectImageSingleColumn
