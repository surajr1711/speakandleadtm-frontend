import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Heading from "../shared/Heading"
import { headingAnim } from "../../hooks/headingAnim"
import { textAnim } from "../../hooks/textAnim"

import "swiper/swiper-bundle.css"
import styles from "./learn.module.scss"
import "swiper/components/pagination/pagination.scss"

gsap.registerPlugin(ScrollTrigger)

const query = graphql`
  {
    strapiHome {
      learn {
        title
      }
      learnModes {
        title
        desc
      }
      learnPathways {
        title
        desc
      }
    }
  }
`

// const pathwaysData = [
//   {
//     name: "dynamic planning",
//     desc:
//       "Be a strategic leader. Understand leadership and communication styles, the effect of conflict on a group and the skills needed to defuse and direct conflict. Develop strategies to facilitate change in an organization or group, interpersonal communication and public speaking.",
//   },
//   {
//     name: "effective coaching",
//     desc:
//       "Be a positive communicator and leader. Understand and build consensus, contributing to the development of others by coaching and establishing strong public speaking skills. Learn effective interpersonal communication.",
//   },
//   {
//     name: "engaging humor",
//     desc:
//       "Be a humorous and engaging public speaker. Understand your sense of humor and how that sense of humor translates to engaging audience members. Develop an understanding of how to effectively use humor in a speech, including challenging situations and impromptu speeches.",
//   },
//   {
//     name: "innovative planning",
//     desc:
//       "Be a public speaker and leader. Develop a strong connection with audience members when you present, speech writing and speech delivery. Build an understanding of the steps to manage a project, as well as creating innovative solutions. ",
//   },
//   {
//     name: "leadership development",
//     desc:
//       "Be an effective communicator and leader. Learn how to manage time, as well as how to develop and implement a plan. Public speaking and leading a team are emphasized in all projects.",
//   },
//   {
//     name: "motivational strategies",
//     desc:
//       "Be a powerful and effective communicator. Learn strategies for building connections with the people around you, understanding motivation and successfully leading small groups to accomplish tasks.",
//   },
//   {
//     name: "persuasive influence",
//     desc:
//       "Be an innovative communicator and leader. Learn how to negotiate a positive outcome together with building strong interpersonal communication and public speaking skills. Develop leadership skills to use in complex situations.",
//   },
//   {
//     name: "presentational mastery",
//     desc:
//       "Be an accomplished public speaker. Learn how an audience responds to you and improving your connection with audience members. Develop an understanding of effective public speaking technique, including speech writing and speech delivery.",
//   },
//   {
//     name: "strategic relationships",
//     desc:
//       "Be a leader in communication. The projects on this path focus on understanding diversity, building personal and/or professional connections with a variety of people and developing a public relations strategy.",
//   },
//   {
//     name: "team collaboration",
//     desc:
//       "Be a collaborative leader. The projects on this path focus on active listening, motivating others and collaborating with a team. Build interpersonal communication and public speaking skills.",
//   },
//   {
//     name: "visionary communication",
//     desc:
//       "Be a strategic communicator and leader. Develop your skills for sharing information with a group, planning communications and creating innovative solutions.",
//   },
// ]
// const learningModesData = [
//   {
//     name: "mentors",
//     desc:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, libero. Eos harum fuga rerum necessitatibus deleniti ipsum dolore sint minus esse animi? Voluptatibus vel ea impedit facere voluptas laudantium dolorum autem, quae iste, quos atque blanditiis nostrum optio, rerum minus.",
//   },
//   {
//     name: "feedback",
//     desc:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, libero. Eos harum fuga rerum necessitatibus deleniti ipsum dolore sint minus esse animi? Voluptatibus vel ea impedit facere voluptas laudantium dolorum autem, quae iste, quos atque blanditiis nostrum optio, rerum minus.",
//   },
//   {
//     name: "roles",
//     desc:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, libero. Eos harum fuga rerum necessitatibus deleniti ipsum dolore sint minus esse animi? Voluptatibus vel ea impedit facere voluptas laudantium dolorum autem, quae iste, quos atque blanditiis nostrum optio, rerum minus.",
//   },
// ]

SwiperCore.use([Navigation, Pagination, Autoplay])

const Learn = () => {
  // const [learningModes, pathways] = details
  const {strapiHome: {learn, learnModes, learnPathways}} = useStaticQuery(query)
  // const learningModes = details[0]
  // const pathways = details[1]
  const learnRef = useRef(null)
  const learnHeadingRef = useRef(null)
  const pathwaysDescRef = useRef(null)
  const learningModesRef = useRef(null)

  useEffect(() => {
    const learnTl = gsap.timeline({
      scrollTrigger: {
        trigger: learnRef.current,
        id: "learn",
        // markers: true,
        start: "20% 80%",
        end: "80% 20%",
        toggleActions: "play pause resume pause",
      },
    })
    learnTl
      .add(headingAnim(learnHeadingRef))
      .add(textAnim(pathwaysDescRef), "-=0.6")
      .from(learningModesRef.current.childNodes, {
        stagger: 0.15,
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      })
  }, [])

  // useEffect(() => {
  //   console.log(learningModes);
  //   console.log(pathways);
  // }, [])

  return (
    <section ref={learnRef} className={styles.learn}>
      <div className="container">
        <Heading
          ref={learnHeadingRef}
          title={learn.title}
          elmClass={styles.heading}
        />
        <div>
          <div ref={pathwaysDescRef} className={styles.pathways_desc}>
            <h3>{learnModes[0].title}</h3>
            <p>{learnModes[0].desc}</p>
          </div>

          <Swiper
            tag="div"
            wrapperTag="ul"
            className={styles.pathways_cards}
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            // navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              600: {
                spaceBetween: 20,
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              800: {
                spaceBetween: 30,
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1000: {
                spaceBetween: 40,
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1200: {
                spaceBetween: 50,
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
            }}
          >
            {learnPathways.map((pathway, i) => (
              <SwiperSlide
                key={`pathway-${i}`}
                tag="li"
                className={styles.card}
              >
                <div className={styles.card_cover}>
                  <p className={styles.card_coverTitle}>{pathway.title}</p>
                </div>
                <div className={styles.card_desc}>
                  <p className={styles.card_descTitle}>{pathway.title}</p>
                  <p>{pathway.desc}</p>
                </div>
              </SwiperSlide>
            ))}
            {/* {pathwaysData.map((pathway, i) => (
              <SwiperSlide
                key={`pathwayCard${i}`}
                tag="li"
                className={styles.card}
              >
                <div className={styles.card_cover}>
                  <p className={styles.card_coverTitle}>{pathway.name}</p>
                </div>
                <div className={styles.card_desc}>
                  <p className={styles.card_descTitle}>{pathway.name}</p>
                  <p>{pathway.desc}</p>
                </div>
              </SwiperSlide>
            ))} */}
          </Swiper>
        </div>

        <div ref={learningModesRef} className={styles.learningModes}>
          {learnModes.slice(1).map((box, i) => (
            <div key={`learningModes-${i}`} className={styles.learningModes_box}>
              <h3>{box.title}</h3>
              <p>{box.desc}</p>
            </div>
          ))}
          {/* {learningModesData.map((box, i) => (
            <div key={`learningModes${i}`} className={styles.learningModes_box}>
              <h3>{box.name}</h3>
              <p>{box.desc}</p>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  )
}

export default Learn
