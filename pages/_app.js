import { useEffect, useState, useLayoutEffect } from "react";
import Router from "next/router";
import { gsap } from "gsap"
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { isMobile } from 'react-device-detect'
import '../styles/globals.scss'
import Header from "../components/Header"
import ScrollProgressBar from "../components/ScrollProgressBar"
import { AppProvider } from "../context/appContext"
import Cursor from "../components/Cursor"
import Navigation from "../components/Navigation"
import { getStrapiURL } from "./../lib/api"

gsap.registerPlugin(ScrollTrigger);

function App({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);
  const [hamburgerPosition, setHamburgerPosition] = useState({
    x: 0,
    y: 0,
  });

  const routeChange = () => {
    // Temporary fix to avoid flash of unstyled content
    // during route transitions. Keep an eye on this
    // issue and remove this code when resolved:
    // https://github.com/vercel/next.js/issues/17464
    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach((elem) => {
        elem.removeAttribute("media");
      });
    };
    tempFix();
  };
  Router.events.on("routeChangeComplete", routeChange);
  Router.events.on("routeChangeStart", () => {
    routeChange();
  });

  useEffect(() => {
    const layoutContainer = document.querySelector('.layout-container');
    if (layoutContainer) console.log('_app -> useEffect [] ' + layoutContainer.getBoundingClientRect().height);
    router.push(router.asPath); // damit fix auch beim ersten laden funktioniert
    console.log("%c©2024 dreipunkt", "color: #008876; font-size: 21px");
    console.log('isMobile: ', isMobile);
    console.log('api: ',getStrapiURL());
    gsap.to("body", { visibility: "visible" });
    if (document.readyState == "complete") {
      gsap.to("body", { visibility: "visible" });
      if (isMobile) gsap.to("body", { overflow: "visible" });
      setLoading(false);
    }
    else {
      window.addEventListener('load', (event) => {
        gsap.to("body", { visibility: "visible" });
        if (isMobile) gsap.to("body", { overflow: "visible" });
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ?
        <></>
        :
        <AppProvider>
          {!isMobile ?
            <Cursor
              hamburgerPosition={hamburgerPosition}
            />
            : <></>
          }
          <Header
            setHamburgerPosition={setHamburgerPosition}
          />
          <Navigation
            hamburgerPosition={hamburgerPosition}
          />
          <ScrollProgressBar />
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </AppProvider >
      }
    </>
  )
}

export default App
