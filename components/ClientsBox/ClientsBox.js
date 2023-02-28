import styles from "./ClientsBox.module.scss"

const ClientsBox = ({ clients }) => {
  return (
    <section>
      <div className={`${styles.clientsContainer} content-padding-top`}>
        <div className={`${styles.clientsWrapper} content-padding`} >
          <div className={styles.containerTitle}>Diese Kundenvertrauen uns</div>
          <div className={styles.containerColumns}>
            {clients && clients.map((list, index) => {
              const col = (index % 3) + 1;
              //const list = list.list.replace('\n', '</br>');
              return (
                <div key={list.id} className={`${styles.containerColumnsInner} ${col === 1 ? styles.paddingColLeft : (col === 2 ? styles.paddingColCenter : styles.paddingColRight)}`}>
                  <div className={styles.list}>
                    {list.list}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section >
  )
}

export default ClientsBox
