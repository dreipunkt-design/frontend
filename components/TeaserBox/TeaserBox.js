import TeasersColumn from "./TeasersColumn"
import styles from "./TeaserBox.module.scss"
import useWindowSize from "../../hooks/useWindowSize"

const TeaserBox = ({ projects, teasers }) => {
  const windowSize = useWindowSize();
  return (
    <section>
      <div className={`${styles.teaserContainer} content-padding`}>
        {teasers && teasers.map((teaser_group, index) => {
          if (teaser_group.__component == "teasers.teasers-single-column") {
            return (
              <div key={index} className={styles.containerOneColumns}>
                <TeasersColumn projects={projects} teasers={teaser_group.center} column={'single'} />
              </div>
            )
          }
          else {
            if (windowSize.width <= process.env.breakpoints.tablet) {
              const data = teaser_group.left.concat(teaser_group.right);
              return (
                <div key={index} className={styles.containerOneColumns}>
                  <TeasersColumn projects={projects} teasers={data} column={'single'} />
                </div>
              );
            }
            else
              return (
                <div key={index} className={styles.containerTwoColumns}>
                  <div className={`${styles.containerTwoColumnsInner} ${styles.columnLeft}`}>
                    <TeasersColumn projects={projects} teasers={teaser_group.left} column={'left'} />
                  </div>
                  <div className={`${styles.containerTwoColumnsInner} ${styles.columnRight}`}>
                    <TeasersColumn projects={projects} teasers={teaser_group.right} column={'right'} />
                  </div>
                </div>
              )
          }
        })}
      </div>
    </section>
  )
}

export default TeaserBox
