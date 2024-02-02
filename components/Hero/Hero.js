import { useEffect, useRef } from "react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion";
import styles from './Hero.module.scss';
import { useGlobalDispatchContext } from "../../context/appContext"

const transition = { duration: .6, ease: [0.6, 0.01, -0.05, 0.9] };
const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Hero = ({ url, title, text }) => {
  const cref = useRef(null);
  const textRef = useRef(null);
  const dispatch = useGlobalDispatchContext();

  useEffect(() => {
    // Logofarbe weiß/schwarz
    const q = gsap.utils.selector(cref);
    ScrollTrigger.create({
      trigger: cref,
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onEnterBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onLeave: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false }),
      onLeaveBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false })
    });
    // Text ausblenden
    const text = gsap.timeline({ paused: true })
    text.to(textRef, { y: 100, ease: 'none', opacity: 0 });
    ScrollTrigger.create({
      trigger: cref,
      start: "bottom 90%",
      end: "bottom 60%",
      scrub: true,
      animation: text
    });
    // Scroll-Animation Image-Mask (Bild innerhalb der Maske bewegen)
    const uncover = gsap.timeline({ paused: true })
    uncover.to(q('video'), { yPercent: 100, ease: 'none' });
    ScrollTrigger.create({
      trigger: cref,
      start: 'bottom bottom',
      end: '+=200%',
      animation: uncover,
      scrub: true
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header ref={el => cref = el}>
      <motion.div className={styles.hero}
        exit={{ opacity: 0 }}
        transition={transition_opacity}
      >
        <section className={styles.heroInner}>
          <motion.div className={styles.heroVideoMask}
            initial={{ height: 0 }}
            animate={{ height: '100vh' }}
            transition={transition}
          >
            <video autoPlay muted loop playsInline>
              <source type="video/mp4" src={url} />
            </video>
          </motion.div>
          <div ref={el => textRef = el} className={`${styles.heroContent} content-padding`}>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 0.7,
                delay: 0.5,
              }}
            ><span>{title}</span></motion.h1>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 0.7,
                delay: 0.6,
              }}
            >{text}
            </motion.h3>
          </div>
        </section>
      </motion.div>
    </header>
  )
}

export default Hero
