import { useEffect, useRef, useState } from "react";
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion"

import styles from "./TeaserThumb.module.scss"
import StrapiImage from "../StrapiImage"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const transition = { duration: 2, ease: [0.22, 1, 0.36, 1] };
const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };
const variants = {
  move: {
    transition: {
      delay: 0.6
    }
  },
  hide: {
    opacity: 0,
    transition: transition_opacity
  },
}

const TeaserThumb = ({ project, column, large }) => {
  const imageData = project.attributes.mainimage.data;
  const thumbImageClass = (column === 'single') ? styles.thumbImageSingle : styles.thumbImage;
  const cref = useRef(null);
  const tl = useRef(null);
  const imageHeightPercent = (imageData.attributes.height / imageData.attributes.width * (typeof column !== 'undefined' ? (column === 'single' ? 100 : 180) : 180));
  const imageHeight = imageHeightPercent * 0.9; // abzgl.10% für Animation
  const [reveal, setReveal] = useState('');
  const dispatch = useGlobalDispatchContext();
  const { cursorStyles } = useGlobalStateContext();
  const [clicked, setClicked] = useState(false);

  const onCursor = (cursorType, caption) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType, caption: caption });
  }

  useEffect(() => {
    const q = gsap.utils.selector(cref);
    // Anfangsanimation - maske nach oben aufschieben
    const tl = gsap.timeline({ paused: true });
    tl.from(q(`.${styles.teaserThumb}`), { y: 300, ease: Power3.easeOut, duration: 1 })
      .from(q(`.${styles.info}`), { y: 30, opacity: 0, ease: Power3.easeOut, duration: 1 }, 1);
    ScrollTrigger.create({
      trigger: cref,
      animation: tl,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none none",
      onEnter: () => {
        setReveal(styles.isReveal);
      }
    });
    // Scroll-Animation Image-Mask (Bild innerhalb der Maske bewegen)
    const uncover = gsap.timeline({ paused: true })
    gsap.set(q('img'), { yPercent: -20 })
    uncover.to(q('img'), { yPercent: 10, ease: 'none' });
    ScrollTrigger.create({
      trigger: cref,
      start: 'top bottom',
      end: '+=200%',
      animation: uncover,
      scrub: true
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div ref={el => cref = el}
      className={`${styles.teaserThumbContainer} ${column === 'single' && !large ? styles.single : ''} ${large ? styles.large : ''}`}>
      <div
        onMouseEnter={() => {
          if (!clicked) onCursor("project");
        }}
        onMouseLeave={() => {
          onCursor();
        }}
        onClick={() => {
          setClicked(true);
          onCursor();
          const q = gsap.utils.selector(cref),
            mask_rect = (column === 'single') ? q(`.${styles.thumbImageSingle}`)[0].getBoundingClientRect() : q(`.${styles.thumbImage}`)[0].getBoundingClientRect(),
            img_rect = q('img')[0].getBoundingClientRect();
          dispatch({
            type: "THUMB_POSITION_TYPE", thumbPosition: {
              mask_rect: mask_rect,
              img_rect: img_rect
            }
          })
        }}
      >
        <Link href={`/project/${project.attributes.slug}`}>
          <a>
            <motion.div className={styles.teaserThumb}
              exit={clicked ? "move" : "hide"}
              variants={variants}
            >
              <motion.div className={`${styles.info} ${large ? styles.large : ''}`}
                exit={{ opacity: 0 }}
                transition={transition_opacity}
              >
                <div className={`${styles.caption} ${column === 'single' ? styles.single : ''}`}>
                  {project.attributes.caption}
                </div>
                <h3>
                  {project.attributes.title}
                </h3>
              </motion.div>
              <div className={thumbImageClass} style={{ paddingBottom: `${imageHeight}%` }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={transition}
                >
                  <StrapiImage image={imageData} reveal={reveal} />
                </motion.div>
              </div>
            </motion.div>
          </a>
        </Link>
      </div>
    </div>

  )
}

export default TeaserThumb
