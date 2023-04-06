import { useState, useRef, useEffect } from 'react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { motion } from "framer-motion"
import styles from './ProjectHero.module.scss'
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"
import { getMediaURL } from "../../lib/api"

let transition = { duration: .6, ease: [0.6, 0.01, -0.05, 0.9] };

const ProjectHero = ({ image, imagePhone }) => {
  const cref = useRef(null);
  const dispatch = useGlobalDispatchContext();
  const { thumbPosition } = useGlobalStateContext();
  const [maskFinished, setMaskFinished] = useState(false);
  const [imgFinished, setImgFinished] = useState(false);

  let mask_initial = {
    top: window.innerHeight / 2,
    left: 0,
    height: window.innerHeight / 2,
    width: '100%'
  }
  let img_initial = {
    top: -window.innerHeight / 2,
    left: null,
    height: null,
    width: null
  }

  if (thumbPosition)
    if (typeof thumbPosition.redirect === 'undefined') {
      mask_initial = {
        top: thumbPosition.mask_rect.top,
        left: thumbPosition.mask_rect.left,
        height: thumbPosition.mask_rect.height,
        width: thumbPosition.mask_rect.width
      }
      img_initial = {
        top: thumbPosition.img_rect.top - thumbPosition.mask_rect.top,
        left: thumbPosition.img_rect.left - thumbPosition.mask_rect.left,
        height: thumbPosition.img_rect.height,
        width: thumbPosition.img_rect.width
      }
    }


  const variants_mask = {
    initial: mask_initial,
    animate: {
      top: null,
      left: null,
      width: '100%',
      height: window.innerWidth <= 1200 ? '60vh' : '100vh',
      transition: transition
    },
    set: {
      top: null,
      left: null,
      width: null,
      height: null
    },
    exit: {
      height: 0,
      transition: transition
    }
  };
  const variants_img = {
    initial: img_initial,
    animate: {
      top: null,
      left: null,
      width: window.innerWidth,
      height: window.innerWidth <= 1200 ? '60vh' : '100vh',
      transition: transition
    },
    set: {
      top: null,
      left: null,
      height: null,
      width: null,
    }
  }
  let imageSet = new Array();
  let imageData = image.data;
  let imagePhoneData = imagePhone.data;
  imageSet.push(getMediaURL() + imageData.attributes.url);
  if (imageData.attributes.formats.hasOwnProperty('large'))
    imageSet.push(getMediaURL() + imageData.attributes.formats.large.url);
  if (imageData.attributes.formats.hasOwnProperty('medium'))
    imageSet.push(getMediaURL() + imageData.attributes.formats.medium.url);
  if (imagePhoneData) {
    imageSet.push(getMediaURL() + imagePhoneData.attributes.url);
  }
  else {
    if (imageData.attributes.formats.hasOwnProperty('small'))
      imageSet.push(getMediaURL() + imageData.attributes.formats.small.url);
  }
  let minWidthMax = imageSet.length * 250;
  let sources = new Array();
  imageSet.map((image) => {
    sources.push({
      minWidth: minWidthMax,
      srcSet: image
    });
    minWidthMax = minWidthMax - 250;
  });

  useEffect(() => {
    ScrollTrigger.create({
      trigger: cref,
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onEnterBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: true }),
      onLeave: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false }),
      onLeaveBack: () => dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={styles.heroContainer} ref={el => cref = el}>
      <div className={styles.hero}>
        <div className="hero-inner">
          <section>
            {(thumbPosition && (typeof thumbPosition.redirect !== 'undefined')) ?
              <div className={styles.heroImageWrap}>
                <picture>
                  {sources.map((source) => {
                    if (source.minWidth == 250)
                      return (
                        <img key={`image-${image.id}`} src={source.srcSet} alt={image.attributes.alternativeText} />
                      );
                    else
                      return (
                        <source key={`source-${image.id}-${source.minWidth}`} media={`(min-width: ${source.minWidth}px)`} srcSet={source.srcSet} />
                      )
                  })}
                </picture>
              </div>
              :
              <motion.div className={styles.heroImageWrap}
                initial="initial"
                animate={maskFinished ? "set" : "animate"}
                exit="exit"
                variants={variants_mask}
                onAnimationComplete={() => {
                  setMaskFinished(true);
                }}
              >
                <picture>
                  {sources.map((source) => {
                    if (source.minWidth == 250)
                      return (
                        <motion.img key={`image-${image.id}`} src={source.srcSet} alt={image.attributes.alternativeText}
                          initial="initial"
                          animate={imgFinished ? "set" : "animate"}
                          variants={variants_img}
                          onAnimationComplete={() => {
                            setImgFinished(true);
                          }}
                        />
                      );
                    else
                      return (
                        <source key={`source-${image.id}-${source.minWidth}`} media={`(min-width: ${source.minWidth}px)`} srcSet={source.srcSet} />
                      )
                  })}
                </picture>
              </motion.div>
            }
          </section>
        </div>
      </div>
    </header>
  )
}

export default ProjectHero
