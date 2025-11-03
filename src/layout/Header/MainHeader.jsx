// src/components/Header/MainHeader.jsx
import React, { useRef, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "@/lib/gsapConfig.js"; // ⬅️ ensure filename & extension match exactly
import MenuItem from "./MenuItem";
import Logo from "@/components/Logo/Logo";
import navData from "@/jsonData/navData.json";

const MainHeader = forwardRef(function MainHeader({ setIsSideBarOpen }, toolboxRef) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const animRef = useRef(null);

  // Animate mobile nav open/close
  useGSAP(
    () => {
      const el = mobileNavRef.current;
      if (!el) return;

      // kill previous timeline to avoid stacking
      animRef.current?.kill();

      const isOpening = isNavOpen;

      // measure content height safely
      const targetHeight = isOpening ? el.scrollHeight : 0;

      // set initial styles if needed
      gsap.set(el, { overflow: "hidden" });

      animRef.current = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.out" } });
      if (isOpening) {
        // from collapsed to expanded
        animRef.current
          .set(el, { height: 0, opacity: 0, pointerEvents: "none" })
          .to(el, { height: targetHeight, opacity: 1, pointerEvents: "auto" })
          .set(el, { height: "auto" }); // allow content to flow after animation
      } else {
        // from expanded to collapsed
        const currentHeight = el.offsetHeight || el.scrollHeight || 0;
        animRef.current
          .set(el, { height: currentHeight, opacity: 1, pointerEvents: "auto" })
          .to(el, { height: 0, opacity: 0, pointerEvents: "none" });
      }
    },
    { dependencies: [isNavOpen] }
  );

  return (
    <div className="cs_main_header">
      <div className="container-fluid">
        <div className="cs_main_header_in">
          {/* Main Header Left Area */}
          <div className="cs_main_header_left">
            <Logo />
          </div>

          {/* Main Header Middle Area */}
          <div className="cs-logi-header-middle">
            <nav className="cs_nav cs_medium" aria-label="Primary">
              <ul
                className={`cs_nav_list ${isNavOpen ? "cs_show-mobile-nav-list" : ""}`} // keep your class; ensure CSS matches
                ref={mobileNavRef}
              >
                {navData.map((item, index) => (
                  <MenuItem item={item} key={index} />
                ))}
              </ul>

              {/* Toggle Button (accessible) */}
              <button
                type="button"
                onClick={() => setIsNavOpen((prev) => !prev)}
                id="navBar"
                className={`cs_menu_toggle ${isNavOpen ? "cs_toggle_active" : ""}`}
                aria-expanded={isNavOpen}
                aria-controls="primary-navigation"
              >
                <span className="sr-only">Toggle navigation</span>
                <span aria-hidden="true"></span>
              </button>
            </nav>
          </div>

          {/* Main Header Right Area */}
          <div className="cs_main_header_right">
            <div className="cs-header-additional-item">
              <Link to="/order-tracking">
                <span className="cs_accent_color">+</span> Track Your Order
              </Link>
            </div>

            <div
              className="cs_toolbox"
              ref={toolboxRef ?? null}
              onClick={(e) => {
                e.stopPropagation();
                setIsSideBarOpen((prev) => !prev);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsSideBarOpen((prev) => !prev);
                }
              }}
              aria-label="Open tools sidebar"
            >
              <span className="cs_icon_btn">
                <span className="cs_icon_btn_in">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MainHeader;
