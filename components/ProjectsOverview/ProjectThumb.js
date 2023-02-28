import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion"

import styles from "./ProjectThumb.module.scss"
import StrapiImage from "../StrapiImage"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };
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
  }
}

const ProjectThumb = ({ project, previewPrev, previewNext }) => {
  const services = project.attributes.services.data;
  const imageData = project.attributes.mainimage.data;
  const cref = useRef(null);
  const tl = useRef(null);
  const { layoutRendered } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const { cursorStyles } = useGlobalStateContext();
  const [clicked, setClicked] = useState(false);
  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }
  let thumbStyle = '';

  if (typeof previewPrev === 'undefined' && typeof previewNext === 'undefined') {
    if (project.attributes.size !== 'gross' && project.attributes.size !== 'grossMehrzeilig') {
      if (project.attributes.size === 'mittel') {
        if (project.attributes.margin === 'nein') {
          // medium without margin
          if (project.attributes.position === 'links')
            thumbStyle = styles.mediumLeft;
          else
            thumbStyle = styles.mediumRight;
        }
        else {
          // medium with margin
          if (project.attributes.position === 'links')
            thumbStyle = styles.mediumMarginLeft;
          else
            thumbStyle = styles.mediumMarginRight;
        }
      }
      else {
        if (project.attributes.size === 'mittelMehrZeilig') {
          if (project.attributes.position === 'links')
            thumbStyle = styles.mediumLeftRowSpan;
          else
            thumbStyle = styles.mediumRightRowSpan;
        }
        else {
          if (project.attributes.margin === 'nein') {
            // small without margin
            if (project.attributes.position === 'links')
              thumbStyle = styles.smallLeft;
            else
              thumbStyle = styles.smallRight;
          }
          else {
            // small with margin
            if (project.attributes.position === 'links')
              thumbStyle = styles.smallMarginLeft;
            else
              thumbStyle = styles.smallMarginRight;
          }
        }
      }
    }
    else {
      if (project.attributes.size === 'grossMehrzeilig') {
        if (project.attributes.position === 'links')
          thumbStyle = styles.largeLeft;
        else
          thumbStyle = styles.largeRight;
      }
    }
  }
  else {
    // preview Mode
    if (typeof previewPrev !== 'undefined') {
      thumbStyle = styles.previewPrev;
    }
    if (typeof previewNext !== 'undefined') {
      thumbStyle = styles.previewNext;
    }
  }

  useEffect(() => {
    if (layoutRendered) {
      const q = gsap.utils.selector(cref);
      tl.current = gsap.timeline({ paused: true });
      tl.current.from(q(`.${styles.projectThumb}`), 1, { y: 300, autoAlpha: 0, ease: Power3.easeOut }, 0.1)
        .from(q(`.${styles.info}`), 1, { y: 30, autoAlpha: 0, ease: Power3.easeOut });
      ScrollTrigger.create({
        trigger: cref,
        animation: tl.current,
        start: "30% 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      });
      const uncover = gsap.timeline({ paused: true })
      if (project.attributes.format === 'hoch' && typeof previewPrev === 'undefined' && typeof previewNext === 'undefined') {
        gsap.set(q('img'), { width: '240%', xPercent: -(240 / 8) })
        gsap.set(q('img'), { yPercent: -20 })
      }
      else
        gsap.set(q('img'), { yPercent: -20 })
      uncover.to(q('img'), { yPercent: 10, ease: 'none' });
      ScrollTrigger.create({
        trigger: cref,
        start: 'center bottom',
        end: '+=100%',
        animation: uncover,
        scrub: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutRendered]);

  return (

    <div ref={el => cref = el}
      className={`${styles.projectThumbContainer} ${thumbStyle}`}
    >
      <div
        onClick={() => {
          setClicked(true);
          onCursor();
          const q = gsap.utils.selector(cref),
            mask_rect = q(`.${styles.thumbImageSingle}`)[0].getBoundingClientRect(),
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
            <motion.div className={styles.projectThumb}
              exit={clicked ? "move" : "hide"}
              variants={variants}
            >
              <motion.div className={styles.info}
                exit={{ opacity: 0 }}
                transition={transition_opacity}
                onMouseEnter={() => {
                  if (!clicked) onCursor("hovered");
                }}
                onMouseLeave={() => {
                  onCursor();
                }}>
                <h3>
                  {project.attributes.title}
                </h3>
                <ul>
                  {services && services.map((service) => {
                    return (
                      <li key={`${project.id}-${service.id}`}>{service.attributes.label}</li>
                    );
                  })}
                </ul>
              </motion.div>
              <div className={`${styles.thumbImageSingle} ${(project.attributes.format === 'hoch' && typeof previewPrev === 'undefined' && typeof previewNext === 'undefined') ? styles.portrait : ''}`}
                onMouseEnter={() => {
                  if (!clicked) {
                    if (typeof previewPrev !== 'undefined')
                      onCursor('projectPrev');
                    else {
                      if (typeof previewNext !== 'undefined')
                        onCursor('projectNext');
                      else
                        onCursor("project");
                    }
                  }
                }}
                onMouseLeave={() => {
                  onCursor();
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={transition}
                >
                  <StrapiImage image={imageData} />
                </motion.div>
              </div>
            </motion.div>
          </a>
        </Link>
      </div>
    </div>

  )
}

export default ProjectThumb
