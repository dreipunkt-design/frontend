import { useState, useEffect } from "react";

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null,
    });

    useEffect(() => {
        function onMouseUpdate(e) {
            setMousePosition({
                x: e.pageX,
                y: e.pageY
            });
        }
        document.addEventListener('mousemove', onMouseUpdate, false);
        document.addEventListener('mouseenter', onMouseUpdate, false);
        return () => {
            document.removeEventListener("mousemove", onMouseUpdate);
            document.removeEventListener("mouseenter", onMouseUpdate);
        }
    }, []);
    return mousePosition;
}
