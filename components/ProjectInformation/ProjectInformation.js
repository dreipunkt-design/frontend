import { useEffect, useRef } from "react";
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion"
import styles from "./ProjectInformation.module.scss"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const ProjectInformation = ({ project }) => {
  const cref = useRef(null);
  const tl = useRef(null);
  const dispatch = useGlobalDispatchContext();
  const { cursorStyles } = useGlobalStateContext();

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }

  useEffect(() => {
    /*const q = gsap.utils.selector(cref);
    tl.current = gsap.timeline({ paused: true });
    tl.current.from(q(`.${styles.titleContainer}>h1`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .3)
      .from(q(`.${styles.titleContainer}>ul`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .5)
      .from(q(`.${styles.descriptionContainer}`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .7)
      .from(q(`.${styles.projectInformationContainer}>a`), .6, { y: 20, opacity: 0, ease: Power3.easeOut }, .9);
    ScrollTrigger.create({
      trigger: cref,
      animation: tl.current,
      start: "top 70%",
      end: "bottom 20%",
      toggleActions: "play none none none"
    });*/
  }, []);

  return (
    <>
      <section ref={el => cref = el}>
        <motion.div className={`${styles.projectInformationContainer} content-padding-top-extra`}
          exit={{ opacity: 0 }}
          transition={transition_opacity}
        >
          <div className={styles.titleContainer}>
            <h1>{project.attributes.title}</h1>
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.serviceContainer}>
              <ul>
                {project.attributes.services.data && project.attributes.services.data.map((service) => {
                  return (
                    <li key={`${project.id}-${service.id}`}>{service.attributes.label}</li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.description}>{project.attributes.description}</div>
            </div>
          </div>
          <div className={styles.linkContainer}>
            <Link href={`http://${project.attributes.web}`} passHref={true}>
              <a target="_blank"
                className="linkgreen"
                onMouseEnter={() => onCursor("none")}
                onMouseLeave={() => onCursor()}
              >{project.attributes.web}</a>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default ProjectInformation
