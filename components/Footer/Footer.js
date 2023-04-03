import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion";
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from './Footer.module.scss'
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"
import useWindowSize from './../../hooks/useWindowSize'

const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Footer = ({ triggerClass }) => {
  const cref = useRef(null);
  const tl = useRef(null);
  const { cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const windowSize = useWindowSize();

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }

  useEffect(() => {
    const q = gsap.utils.selector(cref);
    const content = document.querySelector(`.${triggerClass}`);
    gsap.set(q(`.${styles.footerContainer}`), { yPercent: -75 });
    const uncover = gsap.timeline({ paused: true })
    uncover.to(q(`.${styles.footerContainer}`), { yPercent: 0, ease: 'none' });
    // Footerpanel vergrößern auf 100vh
    ScrollTrigger.create({
      trigger: content,
      start: 'bottom bottom',
      end: '+=100%',
      animation: uncover,
      scrub: true
    });
    // Animation footer content
    tl.current = gsap.timeline({ paused: true });
    tl.current.from(q(`.${styles.infoTitle}`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .3)
      //.from(q(`.${styles.infoText}`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .5)
      .from(q(`.${styles.navCol}`), .6, { y: 20, opacity: 0, stagger: .3, ease: Power3.easeOut }, .5)
      .from(q(`.${styles.copyright}`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .7)
      .fromTo(q(`.${styles.separator}`), .6, { width: 0 }, { width: '100%', ease: Power3.easeOut }, .9)
    ScrollTrigger.create({
      trigger: cref,
      animation: tl.current,
      start: "top 70%",
      end: "bottom 20%",
      toggleActions: "play none none none"
    });
    // Logofarbe weiß/schwarz
    ScrollTrigger.create({
      trigger: cref,
      start: "top 10%",
      end: "bottom 20%",
      onEnter: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onLeaveBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <footer className={styles.footer} ref={el => cref = el}>
      <motion.section className={`${styles.footerContainer}`}
        exit={{ opacity: 0 }}
        transition={transition_opacity}
      >
        <div className={styles.footerContainerInner}>
          <div className={`${styles.infoTitle}`}>
            <Link href="mailto:hello@dreipunkt.design">
              <a className="footerGetInTouchLink" onMouseEnter={() => onCursor("none")}
                onMouseLeave={onCursor}>Get in touch<span>.</span></a>
            </Link>
          </div>

          <div className={styles.infoNavigation}>
            <div className={styles.navRow}>
              <div className={styles.navCol}>
                <div className={styles.navColTitle}>Contact</div>
                <div className={styles.navColContent}>
                  <div className={styles.contact}>
                    <div className={styles.address}>
                      <div>Körnerstrasse 56</div>
                      <div>04107 Leipzig</div>
                    </div>
                    <div>+49 (0) 341 14 99 03 10</div>
                    <Link href="mailto:hello@dreipunkt.design">
                      <a className="link" onMouseEnter={() => onCursor("none")}
                        onMouseLeave={onCursor}>hello@dreipunkt.design</a>
                    </Link>
                  </div>
                </div>
              </div>
              {
                windowSize.width > process.env.breakpoints.tablet ?
                  <>
                    <div className={styles.navCol}>
                      <div className={styles.navColTitle}>Sitemap</div>
                      <div className={styles.navColContent}>
                        <ul>
                          <li>
                            <Link href="#">
                              <a className="footerNavigationLink" onMouseEnter={() => onCursor("none")}
                                onMouseLeave={onCursor}>Über uns</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <a className="footerNavigationLink" onMouseEnter={() => onCursor("none")}
                                onMouseLeave={onCursor}>Leistungen</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <a className="footerNavigationLink" onMouseEnter={() => onCursor("none")}
                                onMouseLeave={onCursor}>Projekte</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <a className="footerNavigationLink" onMouseEnter={() => onCursor("none")}
                                onMouseLeave={onCursor}>News</a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className={styles.navCol}>
                      <div className={styles.navColTitle}>Social</div>
                      <div className={styles.navColContent}>
                        <ul>
                          <li>
                            <Link href="#">
                              <a className="footerNavigationLink" onMouseEnter={() => onCursor("none")}
                                onMouseLeave={onCursor}>Instagram</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <a className="footerNavigationLink" onMouseEnter={() => onCursor("none")}
                                onMouseLeave={onCursor}>Behance</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <a className="footerNavigationLink" onMouseEnter={() => onCursor("none")}
                                onMouseLeave={onCursor}>LinkedIn</a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                  : <></>

              }
            </div>
          </div>

          <div className={styles.infoFoot}>
            <span className={styles.separator}></span>
            <div className={styles.copyright}>
              <div>
                <Link href="#">
                  <a className="footerlink" onMouseEnter={() => onCursor("none")}
                    onMouseLeave={onCursor}>Impressum</a>
                </Link>
                <span> | </span>
                <Link href="#">
                  <a className="footerlink" onMouseEnter={() => onCursor("none")}
                    onMouseLeave={onCursor}>Datenschutz</a>
                </Link>
              </div>
              <div>COPYRIGHT © 2023 DREIPUNKT</div>
            </div>
          </div>
        </div>
      </motion.section>
    </footer>
  )
}
export default Footer