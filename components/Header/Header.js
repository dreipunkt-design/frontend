import Link from "next/link";
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

import styles from './Header.module.scss'
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const Header = ({ setHamburgerPosition }) => {
  const [headerColorClass, setHeaderColorClass] = useState(styles.white);
  const { darkNavigation } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const { cursorStyles } = useGlobalStateContext();
  const { menuOpen } = useGlobalStateContext();
  const hamburger = useRef(null);

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }

  const menuHover = () => {
    let element = hamburger.current
    let x =
      element.getBoundingClientRect().left +
      document.documentElement.scrollLeft +
      element.offsetWidth / 2
    let y =
      element.getBoundingClientRect().top +
      document.documentElement.scrollTop +
      element.offsetHeight / 2
    setHamburgerPosition({ x: x, y: y });
    onCursor("locked");
  }

  useEffect(() => {
    if (darkNavigation)
      setHeaderColorClass(styles.white);
    else
      setHeaderColorClass(styles.black);
  }, [darkNavigation]);

  return (
    <motion.header className={styles.header}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: [0.6, 0.01, -0.05, 0.9],
        duration: 1,
        delay: 1.2,
      }}>
      <div className="container">
        <div className="row v-center space-between">
          <div className={styles.logo}
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={onCursor}
            onClick={() => {
              if (menuOpen)
                dispatch({ type: 'MENU_OPEN_TYPE', menuOpen: !menuOpen });
            }}
          >
            <Link href="/">
              <a className={`${headerColorClass}  ${menuOpen ? styles.navigation : null}`}>DREIPUNKT.</a>
            </Link>
          </div>
          <div className={styles.hamburger}
            ref={hamburger}
            onMouseEnter={menuHover}
            onMouseLeave={onCursor}
            onClick={() => dispatch({ type: 'MENU_OPEN_TYPE', menuOpen: !menuOpen })}
          >
            <div className={styles.nav}>
              <span className={`${headerColorClass}  ${menuOpen ? styles.noclose : null}`}></span>
              <span className={`${headerColorClass}  ${menuOpen ? styles.close : null}`}></span>
              <span className={`${headerColorClass}  ${menuOpen ? styles.noclose : null}`}></span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
