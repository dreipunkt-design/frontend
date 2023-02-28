import { motion } from "framer-motion";
import styles from "./ScrollProgressBar.module.scss"

const ScrollProgressBar = () => {
    return (
        <>
            <div className={styles.containerScrollProgressBar}>
                <motion.div className={styles.fixBar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: [0.6, 0.01, -0.05, 0.9],
                        duration: .2,
                        delay: 1.2,
                    }}
                ></motion.div>
                <motion.div className={styles.progressBar}
                    initial={{ height: 0 }}
                    animate={{ height: 230 }}
                    transition={{
                        ease: [0.6, 0.01, -0.05, 0.9],
                        duration: .8,
                        delay: 1.4,
                    }}
                >
                    <div id="progressbar" className={styles.progressBarFill}></div>
                </motion.div>
            </div>
        </>
    )
}

export default ScrollProgressBar