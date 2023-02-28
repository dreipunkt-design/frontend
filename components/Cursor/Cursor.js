import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { gsap, Power3 } from "gsap"
import styles from './Cursor.module.scss'
import { useGlobalStateContext } from "../../context/appContext"
import useMousePosition from "../../hooks/useMousePosition"
import StrapiImage from "../StrapiImage"

const Cursor = ({ hamburgerPosition }) => {
    const { cursorType } = useGlobalStateContext()
    const { cursorImage } = useGlobalStateContext()
    const { cursorCaption } = useGlobalStateContext()
    const { menuOpen } = useGlobalStateContext()
    const mousePosition = useMousePosition()
    const [cursorClass, setCursorClass] = useState('');
    const [cursorPos, setCursorPos] = useState('');
    const [cursorIcon, setCursorIcon] = useState(false);
    const cref = useRef(null);
    const cursorTypeOld = null;

    const iconProject = "../images/plus.svg";
    const iconProjectNext = "../images/arrow-to-project-right.svg";
    const iconProjectPrev = "../images/arrow-to-project-left.svg";

    function setPosition() {
        let newCursorPos = '';
        if (cursorType === 'locked') {
            newCursorPos = {
                left: hamburgerPosition.x,
                top: hamburgerPosition.y
            }
        }
        else {
            newCursorPos = {
                left: mousePosition.x,
                top: mousePosition.y
            }
        }
        setCursorPos(newCursorPos);
        if (cursorType === "news") {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const left = vw * .4 * mousePosition.x / vw;
            const tmImageContainer = gsap.timeline({ paused: true }),
                q = gsap.utils.selector(cref);
            tmImageContainer.to(q(`.${styles.imageContainer}`), 1, { top: mousePosition.y, left: left, ease: Power3.easeOut });
            tmImageContainer.play();
        }
    };

    function setNewsMode() {
        newCursorClass = styles.news;
    };

    useEffect(() => {
        let newCursorClass = '',
            newCursorIcon = false;
        // Cursor Type
        if (cursorType === 'none') newCursorClass = styles.none;
        if (cursorType === 'news') newCursorClass = styles.news;
        if (cursorType === 'hovered') newCursorClass = styles.hovered;
        if (cursorType === 'caption') newCursorClass = styles.caption;
        if (cursorType === 'locked') newCursorClass = styles.locked;
        if (cursorType === 'project' || cursorType === 'projectPrev' || cursorType === 'projectNext') newCursorClass = styles.project;
        // Color menuOpen or Close
        if (menuOpen && (cursorType === 'locked' || cursorType === 'hovered'))
            newCursorClass = newCursorClass + " " + styles.navigationHovered;
        // Icon
        if (cursorType === 'project') newCursorIcon = iconProject;
        if (cursorType === 'projectPrev') newCursorIcon = iconProjectPrev;
        if (cursorType === 'projectNext') newCursorIcon = iconProjectNext;
        setCursorClass(newCursorClass);
        setCursorIcon(newCursorIcon);
        setPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursorType]);

    useEffect(() => {
        setPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mousePosition]);

    return (
        <>
            <div className={`cursor-container`} ref={el => cref = el} >
                <div className={`cursor-main ${styles.cursor} ${cursorClass}`} style={{ left: cursorPos.left, top: cursorPos.top }}>
                    {cursorIcon ?
                        <img src={cursorIcon} alt="ZUM PROJEKT" />
                        : ""}
                    {cursorCaption ?
                        <div className={styles.caption}>{cursorCaption}</div>
                        : ""}
                </div>
                <AnimatePresence>
                    {cursorType === "news" ?
                        <motion.div className={`${styles.imageContainer} ${cursorClass}`}
                            /*initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}*/
                            exit={{
                                opacity: 0
                            }
                            }
                            transition={{ duration: 0.25 /*, ease: [0.6, 0.05, -0.01, 0.9]*/ }}
                        >
                            <div className={styles.imageContainerInner}>
                                <StrapiImage image={(typeof cursorImage !== "undefined") ? cursorImage.data : null} />
                            </div>
                        </motion.div >
                        : ""}
                </AnimatePresence >
            </div >
        </>
    );
}

export default Cursor