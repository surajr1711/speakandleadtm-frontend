import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import ImgContainer from "../shared/ImgContainer"
import Heading from "../shared/Heading"
import { headingAnim } from "../../hooks/headingAnim"
import { textAnim } from "../../hooks/textAnim"
import { imgAnim } from "../../hooks/imgAnim"

import styles from "./about.module.scss"

gsap.registerPlugin(ScrollTrigger)

const query = graphql`
{
  strapiHome {
    about {
      title
      desc
      image {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`

const About = () => {

  const {strapiHome: {about}} = useStaticQuery(query)

  // const data = useStaticQuery(graphql`
  //   query {
  //     allFile(filter: { relativeDirectory: { eq: "index-about" } }) {
  //       nodes {
  //         childImageSharp {
  //           fluid(maxWidth: 1600) {
  //             ...GatsbyImageSharpFluid
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)
  const aboutRef = useRef(null)
  const aboutHeadingRef = useRef(null)
  const aboutTextRef = useRef(null)
  const aboutLinkIconRef = useRef(null)
  const aboutImgRef = useRef(null)

  // useEffect(() => {
  //   console.log(details);
  // }, [])

  useEffect(() => {
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        id: "about",
        // markers: true,
        start: "20% 80%",
        end: "80% 20%",
        toggleActions: "play pause resume pause",
      },
    })
    aboutTl
      .add(headingAnim(aboutHeadingRef))
      .add(textAnim(aboutTextRef), "-=0.45")
      .from(
        aboutLinkIconRef.current,
        {
          duration: 0.75,
          x: 10,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        },
        "-=.45"
      )
      .add(imgAnim(aboutImgRef, { x: "-3rem", y: "3rem" }), "-=1.2")
  }, [])

  return (
    <section ref={aboutRef} className={styles.about}>
      <div className="container">
        <div className={styles.wrapper}>
          <ImgContainer
            ref={aboutImgRef}
            fluid={about.image.childImageSharp.fluid}
            alt="club"
            imgContainerClass={styles.imgContainer}
          />
          <div className={styles.content}>
            <Heading ref={aboutHeadingRef} title={about.title} />
            <div ref={aboutTextRef}>
              <p>
                {about.desc}
                {/* A place where we all help each other improve. Together we try
                until we succeed. */}
              </p>
              <Link className={styles.link} to="/about">
                <span>Learn more about SALT here.</span>
                <span ref={aboutLinkIconRef}>
                  <MdArrowForward className={styles.link_icon} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
