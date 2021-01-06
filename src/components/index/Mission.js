import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Heading from "../shared/Heading"
import { headingAnim } from "../../hooks/headingAnim"
import { textAnim } from "../../hooks/textAnim"
import ImgContainer from "../shared/ImgContainer"
import { imgAnim } from "../../hooks/imgAnim"

import styles from "./mission.module.scss"

gsap.registerPlugin(ScrollTrigger)

const query = graphql`
{
  strapiHome {
    mission {
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

const Mission = () => {
  // const data = useStaticQuery(query)
  // const details = data.strapiHome.mission
  const {strapiHome: {mission}} = useStaticQuery(query)

  // const data = useStaticQuery(graphql`
  //   query {
  //     allFile(filter: { relativeDirectory: { eq: "index-mission" } }) {
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
  const missionRef = useRef(null)
  const missionHeadingRef = useRef(null)
  const missionTextRef = useRef(null)
  const missionImgRef = useRef(null)

  // useEffect(() => {
  //   console.log(mission)
  // }, [])

  useEffect(() => {
    // console.log(
    //   [...missionTextRef.current.childNodes].filter(
    //     node => node.nodeName !== "H2"
    //   )
    // )
    const missionTl = gsap.timeline({
      scrollTrigger: {
        trigger: missionRef.current,
        id: "mission",
        // markers: true,
        start: "20% 80%",
        end: "80% 20%",
        toggleActions: "play pause resume pause",
        // toggleActions: "restart none restart none",
      },
    })
    missionTl
      .add(imgAnim(missionImgRef, { x: "3rem", y: "3rem" }))
      .add(headingAnim(missionHeadingRef), "-=1")
      .add(textAnim(missionTextRef), "-=0.6")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={missionRef} className={styles.mission}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Heading ref={missionHeadingRef} title={mission.title} />
            {/* <Heading ref={missionHeadingRef} title={details.title} /> */}
            <div ref={missionTextRef}>
              <p>
                {mission.desc}
                {/* {details.desc} */}
                {/* We provide a supportive and positive learning experience in
                which members are empowered to develop communication and
                leadership skills, resulting in greater self-confidence and
                personal growth. */}
              </p>
            </div>
          </div>
          <ImgContainer
            ref={missionImgRef}
            fluid={mission.image.childImageSharp.fluid}
            // fluid={details.image.childImageSharp.fluid}
            // fluid={data.allFile.nodes[0].childImageSharp.fluid}
            alt="club"
            imgContainerClass={styles.imgContainer}
          />
        </div>
      </div>
    </section>
  )
}

export default Mission
