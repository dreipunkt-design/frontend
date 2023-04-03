import { useRef } from "react";
import Link from "next/link"
import { gsap, Power3 } from "gsap"
import { useGlobalStateContext, useGlobalDispatchContext } from "../../context/appContext"
import styles from "./TextArrowLink.module.scss"

const TextArrowLink = ({ url, title }) => {
    const cref = useRef(null);
    const tl = useRef(null);
    const dispatch = useGlobalDispatchContext();
    const { cursorStyles } = useGlobalStateContext();

    const onCursor = cursorType => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
    }
    return (
        <>
            <div className={styles.textArrowLinkContainer} ref={el => cref = el}>
                <Link href={url}>
                    <a
                        onMouseEnter={() => {
                            onCursor("hovered");
                            const q = gsap.utils.selector(cref);
                            gsap.to(q(`.${styles.linkArrowMask}>img`), 1, { x: 0, ease: Power3.easeOut });
                        }}
                        onMouseLeave={() => {
                            onCursor();
                            const q = gsap.utils.selector(cref);
                            gsap.to(q(`.${styles.linkArrowMask}>img`), 1, { x: -88, ease: Power3.easeOut });
                        }}>
                        <span className={styles.linkLabel}>{title}</span>
                        <span className={styles.linkArrow}>
                            <span className={styles.linkArrowMask}>
                                <img src="../images/arrow-right.svg" alt={title} />
                            </span>
                        </span>
                    </a>
                </Link>
            </div>
        </>
    )
}

export default TextArrowLink
