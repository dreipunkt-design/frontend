import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ProjectImageFullWidth.module.scss"
import StrapiImage from "../StrapiImage";
import { useGlobalDispatchContext } from "../../context/appContext"
import { getMediaURL } from "../../lib/api"
import useWindowSize from './../../hooks/useWindowSize'

const ProjectImageFullWidth = ({ detail }) => {
  const cref = useRef(null);
  const dispatch = useGlobalDispatchContext();
  const windowSize = useWindowSize();

  useEffect(() => {
    // Logofarbe weiß/schwarz
    ScrollTrigger.create({
      trigger: cref,
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onEnterBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onLeave: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false }),
      onLeaveBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false })
    });
    const q = gsap.utils.selector(cref),
      clip = gsap.timeline({ paused: true });
    clip.to(q(`.${styles.imageScrollAnim}`), { clipPath: 'inset(0px 0vw)', ease: 'none' });
    ScrollTrigger.create({
      trigger: cref,
      start: 'top bottom',
      end: 'top 30%',
      animation: clip,
      scrub: true
    });
    if (windowSize.width > process.env.breakpoints.tablet) {
      const img = gsap.timeline({ paused: true }),
        elem = (detail.media.data.attributes.mime.indexOf('video') !== -1) ? 'video' : 'img';
      img.to(q(elem), { y: '30vh' })
      ScrollTrigger.create({
        trigger: cref,
        start: 'bottom 70%',
        end: 'bottom top',
        animation: img,
        scrub: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section ref={el => cref = el}>
        <div className={`${styles.imageFullWidthContainer}`}>
          <div className={styles.imageFullWidthContainerInner}>
            <div className={styles.imageContainer}>
              <div className={styles.imageScrollAnim}>
                {(detail.media.data.attributes.mime.indexOf('video') !== -1) ?
                  <video autoPlay muted loop playsInline>
                    <source type="video/mp4" src={getMediaURL() + detail.media.data.attributes.url} />
                  </video>
                  :
                  <StrapiImage image={detail.media.data} />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectImageFullWidth
