
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import styles from "./ProjectBoxNext.module.scss"
import StrapiImage from "../StrapiImage";
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"
import { motion } from "framer-motion"

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

const ProjectBoxNext = ({ project }) => {
  const imageData = project.attributes.mainimage.data;
  const cref = useRef(null);
  const imageHeightPercent = (imageData!==null)?(imageData.attributes.height / imageData.attributes.width * 100):50;
  const dispatch = useGlobalDispatchContext();
  const { cursorStyles } = useGlobalStateContext();
  const [clicked, setClicked] = useState(false);
  const onCursor = (cursorType, caption) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType, caption: caption });
  }

  useEffect(() => {
    const q = gsap.utils.selector(cref);
    const containerTrigger = q(`.${styles.projectBoxNextContainerInner}`);
    const tm = gsap.timeline({ paused: true });
    tm.add('project')
      .to(q(`.${styles.projectBoxNextContainerInner}`), { paddingLeft: 0, paddingRight: 0 }, 'project')
      .to(q(`.${styles.thumbImageMarginLeft}`), { width: 0 }, 'project')
      .to(q(`.${styles.thumbImageMarginRight}`), { width: 0 }, 'project');
    ScrollTrigger.create({
      trigger: cref,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: containerTrigger,
      animation: tm
    });
    const tmShowInfo = gsap.timeline({ paused: true, });
    tmShowInfo.from(q(`.${styles.info}`), { y: 15, opacity: 0, ease: Power3.easeOut, duration: .3 });
    ScrollTrigger.create({
      trigger: cref,
      start: 'bottom bottom',
      end: "bottom bottom",
      animation: tmShowInfo,
      toggleActions: "play none reverse none"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section ref={el => cref = el}>
        <div className={`${styles.projectBoxNextContainer} content-padding`}>
          <div className={styles.projectBoxNextContainerInner}>
            <div className={styles.projectBoxThumbContainer}>
              <div
                onMouseEnter={() => {
                  if (!clicked) onCursor("caption", "NEXT");
                }}
                onMouseLeave={() => {
                  onCursor();
                }}
                onClick={() => {
                  setClicked(true);
                  onCursor();
                  const q = gsap.utils.selector(cref),
                    mask_rect = q(`.${styles.thumbImage}`)[0].getBoundingClientRect(),
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
                    <motion.div className={styles.projectBoxThumb}
                      exit={clicked ? "move" : "hide"}
                      variants={variants}
                    >
                      <motion.div className={styles.info}
                        exit={{ opacity: 0 }}
                        transition={transition_opacity}
                      >
                        <h3>
                          {project.attributes.title}
                        </h3>
                      </motion.div>
                      <div className={styles.thumbImage} style={{ paddingBottom: `${imageHeightPercent}%` }}>
                        <div className={styles.thumbImageMarginLeft}></div>
                        <StrapiImage image={imageData} />
                        <div className={styles.thumbImageMarginRight}></div>
                      </div>
                    </motion.div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectBoxNext
