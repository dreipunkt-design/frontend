import { useEffect, useRef } from "react";
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./NewsBox.module.scss"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const NewsBox = ({ news }) => {
  const cref = useRef(null);
  const { layoutRendered } = useGlobalStateContext();
  const { cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  let lastImage = null;
  let lastType = null;

  const onCursor = (cursorType, image) => {
    let set = false;
    if (typeof cursorType === 'undefined' && lastType !== null)
      set = true;
    else if (cursorType !== lastType) {
      set = true;
    }
    else {
      if (image.data.attributes.name !== lastImage.data.attributes.name) {
        set = true;
      }
    }
    if (typeof cursorType === 'undefined') {
      lastType = null;
      lastImage = null;
    }
    else {
      lastType = cursorType;
      lastImage = image;
    }
    if (set) {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
      dispatch({ type: "CURSOR_TYPE", cursorType: cursorType, image: image });
    }
  }

  useEffect(() => {
    if (layoutRendered) {
      const q = gsap.utils.selector(cref);
      const qm = gsap.utils.selector('.layout-container');
      const container = qm('.layout-main');
      // Farbe Header
      ScrollTrigger.create({
        trigger: cref,
        start: 'top 50%',
        onEnter: () => gsap.set(container, { backgroundColor: '#e6e6e4' }),
        onLeaveBack: () => gsap.set(container, { backgroundColor: '#000000' })
      });
      // Reveal Animation
      const tl = gsap.timeline({ paused: true });
      tl.from(q(`.${styles.titleContainer}`), { y: 20, opacity: 0, duration: .5, ease: Power3.easeOut })
        .from(q(`.${styles.newsContainer}`), { y: 20, opacity: 0, duration: .5, stagger: .5, ease: Power3.easeOut }, .5);
      ScrollTrigger.create({
        trigger: cref,
        animation: tl,
        start: "top 50%",
        toggleActions: "play none none none"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutRendered]);

  return (
    <>
      <section ref={el => cref = el}>
        <div className={`${styles.newsBoxContainer} content-padding-small-right content-padding-top`}>
          <div className={styles.newsTitelContainer}>
            <div className={styles.spacerContainer}></div>
            <div className={styles.titleContainer}>LATEST NEWS</div>
          </div>
          <div>
            {news && news.map((newitem) => {
              const jahr = newitem.attributes.datum.substring(0, 4),
                mm = parseInt(newitem.attributes.datum.substring(5, 7)),
                tag = newitem.attributes.datum.substring(8, 10),
                monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
                  "August", "September", "Oktober", "November", "Dezember"],
                monat = monate[mm - 1];
              return (
                <Link href="#" key={newitem.id}>
                  <a
                    onMouseEnter={() => onCursor("news", newitem.attributes.image)}
                    onMouseLeave={() => onCursor()}
                  >
                    <div className={styles.newsContainer}
                    >
                      <div className={styles.titelContainer}>
                        <div className={styles.datum}>{tag} {monat} {jahr}</div>
                        <div className={styles.titel}>{newitem.attributes.titel}</div>
                      </div>
                      <div className={styles.info}>{newitem.attributes.info}</div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
          <div className={styles.newsMoreContainer}>
            <div className={styles.spacerContainer}></div>
            <div className={styles.titleContainer}>MEHR</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NewsBox
