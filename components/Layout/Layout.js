import { useEffect, useLayoutEffect, useRef } from "react"
import { isMobile } from 'react-device-detect'
import Scrollbar from "smooth-scrollbar"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Footer from "../Footer/Footer"
import styles from "./Layout.module.scss"

let bodyScrollBar = null;

const Layout = ({ children, withOutFooter }) => {
  const renderFooter = (typeof withOutFooter === 'undefined') ? true : false;

  useLayoutEffect(() => {
    const scroller = document.querySelector('.scroller'),
      layoutContainer = document.querySelector('.layout-container');
    if (scroller) {
      // Kill all Scrolltriggers & Scrollbars
      ScrollTrigger.getAll().forEach(t => t.kill());
      // Destroy Scrollbar
      if (Scrollbar.getAll().length) Scrollbar.destroyAll();
      if (!isMobile) {
        const progressbar = document.getElementById('progressbar');
        progressbar.style.height = "0%";
        // Resize Observer / Damit wird sichergestellt, dass der Scrolltrigger 
        // nach jeder Layoutänderung der Höhe aktualisiert wird.
        // Ohne diesen Block laufen die Animationen zum Teil fehlerhaft.
        const resizeObserver = new ResizeObserver((entries) => {
          ScrollTrigger.refresh();
          for (let entry of entries) {
            console.log('observer -> ' + entry.contentRect.height);
          }
        });
        resizeObserver.observe(layoutContainer);
        // EdgeEasing
        var __extends = this && this.__extends || function () {
          var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
              { __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; } ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
          };
          return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        var EdgeEasingPlugin = /** @className */ function (_super) {
          __extends(EdgeEasingPlugin, _super);

          function EdgeEasingPlugin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            this.options.disabled = true;
            _this._remainMomentum = {
              x: 0,
              y: 0
            };
            return _this;
          }
          EdgeEasingPlugin.prototype.transformDelta = function (delta) {
            var _a = this.scrollbar, limit = _a.limit, offset = _a.offset;
            var x = this._remainMomentum.x + delta.x;
            var y = this._remainMomentum.y + delta.y;
            // clamps momentum within [-offset, limit - offset]
            if (!this.options.disabled)
              this.scrollbar.setMomentum(Math.max(-offset.x, Math.min(x, limit.x - offset.x)), Math.max(-offset.y, Math.min(y, limit.y - offset.y)));
            return { x: 0, y: 0 };
          };
          EdgeEasingPlugin.prototype.onRender = function (remainMomentum) {
            Object.assign(this._remainMomentum, remainMomentum);
          };
          EdgeEasingPlugin.pluginName = 'edgeEasing';
          return EdgeEasingPlugin;
        }(Scrollbar.ScrollbarPlugin);
        Scrollbar.use(EdgeEasingPlugin);
        //Scrollbar init
        bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });
        ScrollTrigger.scrollerProxy(".scroller", {
          scrollTop(value) {
            if (arguments.length) {
              bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
          }
        });
        bodyScrollBar.addListener(ScrollTrigger.update);
        ScrollTrigger.defaults({ scroller: scroller });
        ScrollTrigger.create({
          onUpdate({ progress, direction, isActive }) {
            progressbar.style.height = `${(progress * 100).toFixed()}%`;
          }
        })
        bodyScrollBar.updatePluginOptions('edgeEasing', { disabled: false });
        setTimeout(() => {
          console.log('timeout -> ' + layoutContainer.getBoundingClientRect().height);
        }, 3000);
      }
      else {
        // mobile Version
        const progressbar = document.getElementById('progressbar');
        progressbar.style.height = "0%";
        ScrollTrigger.create({
          onUpdate({ progress, direction, isActive }) {
            progressbar.style.height = `${(progress * 100).toFixed()}%`;
          }
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isMobile ?
        <div className={`${styles.layoutContainer} layout-container`}>
          <div className={`${styles.layoutMainContent} layout-main`}>
            {children}
          </div>
          <Footer triggerClass={styles.layoutMainContent} />
        </div>
        :
        <div className="scroller">
          <div className={`${styles.layoutContainer} layout-container ${renderFooter ? 'renderFooter' : ''}`}>
            <div className={`${styles.layoutMainContent} layout-main`}>
              {children}
            </div>
            {renderFooter ?
              <Footer triggerClass={styles.layoutMainContent} />
              : <></>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Layout
