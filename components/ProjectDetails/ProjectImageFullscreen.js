
import { useEffect, useRef } from "react"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ProjectImageFullscreen.module.scss"
import StrapiImage from "../StrapiImage";
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"
import { getMediaURL } from "../../lib/api"

const ProjectImageFullscreen = ({ detail }) => {
  const cref = useRef(null);
  const { layoutRendered } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  useEffect(() => {
    if (layoutRendered) {
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
      const img = gsap.timeline({ paused: true });
      img.fromTo(q('img'), { y: '-30vh' }, { y: 0 }).
        to(q('img'), { y: '30vh' })
      ScrollTrigger.create({
        trigger: cref,
        start: 'top bottom',
        end: 'bottom top',
        animation: img,
        scrub: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutRendered]);

  return (
    <>
      <section ref={el => cref = el}>
        <div className={`${styles.imageFullscreenContainer}`}>
          <div className={styles.imageFullscreenContainerInner}>
            <div className={styles.imageContainer}>
              <div className={styles.imageScrollAnim}>
                {(detail.image.data.attributes.mime.indexOf('video') !== -1) ?
                  <video autoPlay muted loop playsInline>
                    <source type="video/mp4" src={getMediaURL() + detail.image.data.attributes.url} />
                  </video>
                  :
                  <StrapiImage image={detail.image.data} />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectImageFullscreen
