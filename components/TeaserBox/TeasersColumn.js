import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import TeaserThumb from "./TeaserThumb"
import styles from "./TeasersColumn.module.scss"

const TeasersColumn = ({ teasers, column }) => {
  const cref = useRef(null);
  let large = false;
  let teasersArray = [];
  if (column === 'single') {
    teasersArray = teasers.center;
    large = teasers.large;
  }
  if (column === 'left')
    teasersArray = teasers.left;
  if (column === 'right')
    teasersArray = teasers.right;

  useEffect(() => {
    if ((column === 'left' && teasers.left.length < teasers.right.length) ||
      (column === 'right' && teasers.right.length < teasers.left.length)) {
      const move = gsap.timeline({ paused: true });
      gsap.set(cref, { y: -200 })
      move.to(cref, { y: 200, ease: 'none' });
      ScrollTrigger.create({
        trigger: cref,
        start: 'center bottom',
        animation: move,
        scrub: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={el => cref = el} className={styles.teaserColumnContainer}>
        {teasersArray && teasersArray.map((teaser) => {
          return (
            <TeaserThumb key={teaser.id} project={teaser.project.data} column={column} large={large} />
          )
        })}
      </div>
    </>
  )
}

export default TeasersColumn
