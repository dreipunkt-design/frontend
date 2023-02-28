import StrapiImage from "../StrapiImage"
import styles from "./ServicesBox.module.scss"

const ServicesBox = ({ services }) => {
  return (
    <section>
      <div className={`${styles.servicesContainer} content-padding content-padding-top`}>
        <div className={styles.containerColumns}>
          {services && services.map((service, index) => {
            const col = (index % 3) + 1;
            return (
              <div key={service.id} className={`${styles.containerColumnsInner} ${col === 1 ? styles.paddingColLeft : (col === 2 ? styles.paddingColCenter : styles.paddingColRight)}`}>
                <div className={styles.serviceImage}>
                  <StrapiImage image={service.icon.data} />
                </div>
                <div className={styles.serviceTitle}>
                  {service.title}
                </div>
                <div className={styles.serviceText}>
                  <div className={styles.text}>{service.text}</div>
                  <div className={styles.number}>{index + 1}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesBox
