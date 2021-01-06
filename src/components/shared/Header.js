import React, { useRef, useEffect, useState, useMemo } from "react"
import { Link } from "gatsby"
import { MdMenu } from "@react-icons/all-files/md/MdMenu";
import { gsap } from "gsap"

import styles from "./header.module.scss"

const navLinks = ["home", "about", "blog"]

const Header = () => {
  const navbarTl = useMemo(() => gsap.timeline({ paused: true }), [])
  const navUlRef = useRef(null)
  const [menuIsOpen, setMenuIsOpen] = useState(true)
  const headerTl = gsap.timeline()

  useEffect(() => {
    headerTl.from(navUlRef.current.childNodes, {
      stagger: 0.15,
      opacity: 0,
      y: 10,
      ease: "power2.inOut",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // console.log("tl initialized")
    navbarTl
      .to(navUlRef.current, {
        duration: 0.45,
        ease: "power3.inOut",
        xPercent: -100,
      })
      .to(
        navUlRef.current.childNodes,
        {
          stagger: 0.1,
          xPercent: -100,
          ease: "back.out(1.10)",
          duration: 0.3,
        },
        "-=0.3"
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !menuIsOpen ? navbarTl.play() : navbarTl.reverse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuIsOpen])

  const menuToggle = () => {
    setMenuIsOpen(!menuIsOpen)
    // console.log(menuIsOpen)
  }

  // // when going above 800px if menu is open, reverses the animation to start position. Otherwise menu would be shifted more into the middle of page.
  // useEffect(() => {
  //   // declare the media query list
  //   const mql = window.matchMedia("(max-width: 800px)")
  //   // create the function to be excuted at media query
  //   const navCheck = e => {
  //     if (e.matches === false) {
  //       // console.log('working');
  //       if (menuIsOpen === true) {
  //         menuToggle()
  //       }
  //     }
  //   }
  //   // attach listener function on state changes
  //   mql.addListener(navCheck)
  //   // run function once on page load
  //   navCheck(mql)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1>Speak and Lead Toastmasters</h1>
      </div>

      <nav className={styles.Navbar}>
        <ul ref={navUlRef}>
          {navLinks.map(link => (
            <li key={`navLinks-${link}`}>
              <Link
                className={styles.Navbar_link}
                activeClassName={styles.Navbar_link___active}
                to={`/${link !== "home" ? link : ""}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button onClick={menuToggle} className={styles.NavBtn}>
        <MdMenu className={styles.NavBtn_icon} />
      </button>
    </header>
  )
}

export default Header
