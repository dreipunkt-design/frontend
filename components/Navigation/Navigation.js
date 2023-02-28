import { useState, useEffect } from 'react';
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion";
import { getMediaURL } from "../../lib/api";
import styles from './Navigation.module.scss'
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"

const navRoutes = [
    {
        id: 0,
        title: "Agentur",
        path: "/agency",
        video: "/uploads/videos/about.mp4",
    },
    {
        id: 1,
        title: "Leistungen",
        path: "/services",
        video: "/uploads/videos/leistungen.mp4",
    },
    {
        id: 2,
        title: "Projekte",
        path: "/projects",
        video: "/uploads/videos/referenzen.mp4",
    }
];

const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] };
const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.8
        }
    },
    exit: {
        opacity: 0
    },
}
const variantsItems = {
    initial: {
        opacity: 0,
        y: 50
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.43, 0.13, 0.23, 0.96],
            duration: 0.6,
        }
    },
    exit: {
        opacity: 0,
        transition: transition
    },
}
const variantsInfo = {
    initial: {
        opacity: 0,
        y: 30
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.9],
            duration: 0.6,
            delay: 1.5
        }
    },
    exit: {
        opacity: 0,
        transition: transition
    },
}
const variantsLink = {
    initial: {
        opacity: 0,
        y: 30
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.6, 0.05, -0.01, 0.9],
            duration: 0.6,
            delay: 1.8
        }
    },
    exit: {
        opacity: 0,
        transition: transition
    },
}

const Navigation = ({ hamburgerPosition }) => {
    const { cursorStyles } = useGlobalStateContext();
    const { menuOpen } = useGlobalStateContext();
    const dispatch = useGlobalDispatchContext();
    const [revealVideo, setRevealVideo] = useState({
        show: false,
        video: null,
        key: "0",
    });

    const onCursor = cursorType => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
    }

    async function sequence() {
        await animation.start({
            left: hamburgerPosition.x,
            top: hamburgerPosition.y,
            height: 56,
            width: 56
        })
        animation.start({
            left: hamburgerPosition.x,
            top: hamburgerPosition.y,
            height: 56,
            width: 56,
            opacity: 0
        })
    }

    return (
        <>
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div className={styles.navigationBackground}
                            initial={{
                                left: hamburgerPosition.x,
                                top: hamburgerPosition.y,
                                height: 56,
                                width: 56,
                                opacity: 0.5
                            }}
                            exit={{
                                left: hamburgerPosition.x,
                                top: hamburgerPosition.y,
                                height: 56,
                                width: 56
                            }}
                            animate={{
                                left: window.innerWidth / 2,
                                top: window.innerHeight / 2,
                                opacity: 1,
                                height: (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) * 1.5,
                                width: (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) * 1.5,
                            }}
                            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
                        >
                        </motion.div>
                        <div className={styles.navigation}>
                            <div className={`${styles.navContainer}`}>
                                <div className={styles.navContainerInner}>
                                    <div className={`${styles.navContent} content-padding`}>
                                        <div className={styles.navMenu}>
                                            <motion.ul
                                                variants={variants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                {navRoutes.map(route => (
                                                    <motion.li
                                                        key={route.id}
                                                        variants={variantsItems}
                                                    >
                                                        <Link href={route.path}>
                                                            <a className="navlink"
                                                                onMouseEnter={() => {
                                                                    onCursor("hovered");
                                                                    setRevealVideo({
                                                                        show: true,
                                                                        video: route.video,
                                                                        key: route.id,
                                                                    });
                                                                }}
                                                                onMouseLeave={() => {
                                                                    onCursor();
                                                                    setRevealVideo({
                                                                        show: false,
                                                                        video: route.video,
                                                                        key: route.id,
                                                                    })
                                                                }}
                                                                onClick={() => {
                                                                    setRevealVideo({
                                                                        show: false,
                                                                        video: route.video,
                                                                        key: route.id,
                                                                    });
                                                                    dispatch({ type: 'MENU_OPEN_TYPE', menuOpen: false });
                                                                }}
                                                            >{route.title}</a>
                                                        </Link>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.navInfo} content-padding`}>
                                <motion.div
                                    variants={variantsInfo}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >+49 (0) 341 14 99 03 10</motion.div>
                                <motion.div
                                    variants={variantsLink}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    <Link href="mailto:hello@dreipunkt.design">
                                        <a className="navinfolink" onMouseEnter={() => onCursor("hovered")}
                                            onMouseLeave={onCursor}>hello@Dreipunkt.design</a>
                                    </Link>
                                </motion.div>
                            </div>
                            {revealVideo.video && menuOpen ?
                                <motion.div className={styles.navVideos}
                                    initial={{
                                        opacity: 0,
                                        width: (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) / 1.5,
                                        height: (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) / 1.5
                                    }}
                                    animate={{
                                        opacity: revealVideo.show ? 1 : 0,
                                        width: (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) / 1.5,
                                        height: (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) / 1.5
                                    }}
                                    exit={{
                                        opacity: 0
                                    }}
                                >
                                    <div className={styles.video}>
                                        <AnimatePresence initial={false} exitBeforeEnter>
                                            <motion.video
                                                key={revealVideo.key}
                                                src={getMediaURL() + revealVideo.video}
                                                initial={{ opacity: 0 }}
                                                exit={{ opacity: 0 }}
                                                animate={{
                                                    opacity: 1,
                                                }}
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                loop
                                                autoPlay
                                            ></motion.video>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                                : <></>
                            }
                        </div>
                    </>
                )
                }
            </AnimatePresence >
        </>
    )
}

export default Navigation;