import React, { useRef, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FaYoutubeSquare } from "@react-icons/all-files/fa/FaYoutubeSquare"
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare"
import { FaInstagramSquare } from "@react-icons/all-files/fa/FaInstagramSquare"
import { MdSmartphone } from "@react-icons/all-files/md/MdSmartphone"
import { MdPlace } from "@react-icons/all-files/md/MdPlace"
// import GoogleMapContainer from './GoogleMapContainer'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Heading from "./Heading"
import { headingAnim } from "../../hooks/headingAnim"

import styles from "./footer.module.scss"

gsap.registerPlugin(ScrollTrigger)

const query = graphql`
  {
    strapiContact {
      title
      caption
      details {
        title
        list {
          desc
        }
      }
    }
  }
`

// ScrollTrigger.defaults({
// markers: true,
// toggleActions: "restart pause restart pause",
// start: 'top 80%',
// })

const Footer = () => {
  const headingRef = useRef(null)
  const footerDetailsRef = useRef(null)

  const {strapiContact: {title, caption, details}} = useStaticQuery(query)
  const [connect, meet, social] = details

  useEffect(() => {
    // console.log(headingRef)
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        id: "footer",
        // markers: true,
        start: "20% 80%",
        toggleActions: "play pause resume pause",
      },
    })
    footerTl
      .add(headingAnim(headingRef))
      .from(
        headingRef.current.nextElementSibling,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
        },
        "-=0.5"
      )
      .from(
        footerDetailsRef.current.childNodes,
        {
          y: 50,
          opacity: 0,
          stagger: {
            each: 0.15,
            ease: "circle.out",
          },
        },
        "-=0.3"
      )
    // console.log(headingRef.current.nextElementSibling)
  }, [])

  return (
    <footer className={styles.Footer}>
      <div className={["container", styles.container].join(" ")}>
        <Heading
          ref={headingRef}
          title={title}
          elmClass={styles.Footer_heading}
        />
        <p>{caption}</p>

        <div ref={footerDetailsRef} className={styles.Footer_details}>
          <div
            className={[styles.Footer_box, styles.Footer_box___phone].join(" ")}
          >
            <MdSmartphone className={styles.Footer_boxIcon} />
            <h3>{connect.title}</h3>
            <address>
              <ul>
                {connect.list.map((item, i) => (
                  <li key={`connect-${i}`}>{item.desc}</li>
                ))}
              </ul>
            </address>
          </div>

          <div
            className={[styles.Footer_box, styles.Footer_box___address].join(
              " "
            )}
          >
            <MdPlace className={styles.Footer_boxIcon} />
            <h3>{meet.title}</h3>
            <address>
              <ul>
                {meet.list.map((item, i) => (
                  <li key={`meet-${i}`}>{item.desc}</li>
                ))}
              </ul>
            </address>
          </div>

          <div
            className={[styles.Footer_box, styles.Footer_box___map].join(" ")}
          >
            Google Maps API container goes here
            {/* <GoogleMapContainer /> */}
          </div>

          <div
            className={[styles.Footer_box, styles.Footer_box___social].join(
              " "
            )}
          >
            <h3>{social.title}</h3>
            {/* <Link to={social.list[0].desc}> */}
            <Link to="#">
              <FaYoutubeSquare className={styles.socialIcon} />
            </Link>
            {/* <Link to={social.list[1].desc}> */}
            <Link to="#">
              <FaFacebookSquare className={styles.socialIcon} />
            </Link>
            {/* <Link to={social.list[2].desc}> */}
            <Link to="#">
              <FaInstagramSquare className={styles.socialIcon} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
