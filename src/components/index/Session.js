import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Heading from "../shared/Heading"
import ImgContainer from "../shared/ImgContainer"
import { headingAnim } from "../../hooks/headingAnim"
import { textAnim } from "../../hooks/textAnim"
import { imgAnim } from "../../hooks/imgAnim"

import styles from "./session.module.scss"

gsap.registerPlugin(ScrollTrigger)

const query = graphql`
{
  strapiHome {
    session {
      title
      image {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    sessionAgenda {
      title
    }
  }
}
`

const Session = () => {
  const {strapiHome: {session, sessionAgenda}} = useStaticQuery(query)
  // const data = useStaticQuery(graphql`
  //   query {
  //     allFile(filter: { relativeDirectory: { eq: "index-session" } }) {
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
  const sessionRef = useRef(null)
  const sessionHeadingRef = useRef(null)
  const sessionImgRef = useRef(null)
  const sessionTimelineRef = useRef(null)

  // useEffect(() => {
  //   console.log(session, sessionAgenda)
  // }, [])

  useEffect(() => {
    const sessionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sessionRef.current,
        id: "session",
        // markers: true,
        start: "20% 80%",
        end: "80% 20%",
        toggleActions: "play pause resume pause",
      },
    })
    sessionTl
      .add(headingAnim(sessionHeadingRef))
      .add(imgAnim(sessionImgRef, { x: "3rem", y: "-3rem" }), "-=0.9")
      .add(textAnim(sessionTimelineRef), "-=0.5")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={sessionRef} className={styles.session}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            
            <Heading ref={sessionHeadingRef} title={session.title} />
            
            <ul ref={sessionTimelineRef} className={styles.timeline}>
              {sessionAgenda.map((segment, i) => <li key={`session-segment-${i}`}>{segment.title}</li> )}
              {/* <li>Club president gives the opening address.</li>
              <li>Toastmaster of the Day conducts the session.</li>
              <li>Round robin section based on the theme of the day.</li>
              <li>Members deliver project speeches. 5-7 minutes each.</li>
              <li>Table topics. Impromptu speeches 2-3 minutes each.</li>
              <li>Evaluations of project speeches. 2-3 minutes each.</li>
              <li>Club president gives the closing address.</li> */}
            </ul>

          </div>
          <ImgContainer
            ref={sessionImgRef}
            fluid={session.image.childImageSharp.fluid}
            // fluid={data.allFile.nodes[0].childImageSharp.fluid}
            alt="club"
            imgContainerClass={styles.imgContainer}
          />
        </div>
      </div>
    </section>
  )
}

export default Session
