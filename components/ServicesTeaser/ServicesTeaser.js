import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { gsap } from "gsap"
import styles from "./ServicesTeaser.module.scss"
import ServiceTeaserBox from "./ServiceTeaserBox"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const ServicesTeaser = ({ services }) => {
  const cref = useRef(null);
  const dispatch = useGlobalDispatchContext();

  useEffect(() => {
    ScrollTrigger.create({
      trigger: cref,
      end: "bottom 10%",
      onEnterBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true })
    });
    const q = gsap.utils.selector(cref);
    const containerTrigger = q(`.${styles.servicesTeaserContainer}`);
    const qm = gsap.utils.selector('.layout-container');
    const container = qm('.layout-main');
    const tl = gsap.timeline({ paused: true });
    tl.to(container, { backgroundColor: '#000000', ease: 'none' });
    ScrollTrigger.create({
      trigger: containerTrigger,
      start: 'top bottom', // top => trigger bottom => viewport 
      end: 'top 70%', // top => trigger top => viewport 
      animation: tl,
      scrub: true,
      onEnter: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onLeaveBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={el => cref = el}>
      <div className={`${styles.servicesTeaserContainer}`}>
        {services && services.map((service, index) => {
          const videoRight = (index % 2 === 0) ? false : true;
          return (
            <ServiceTeaserBox service={service} videoRight={videoRight} key={service.id} />
          );
        })}
      </div>
    </section>
  )
}

export default ServicesTeaser
