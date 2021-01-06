import React, { useEffect, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper"
import { MdKeyboardArrowDown } from "@react-icons/all-files/md/MdKeyboardArrowDown"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import ImgContainer from "../shared/ImgContainer"

import "swiper/swiper-bundle.css"
import styles from "./main.module.scss"

gsap.registerPlugin(ScrollTrigger)

const query = graphql`
{
  allStrapiBlogs(limit: 3, sort: {order: DESC, fields: date}) {
    nodes {
      title
      author
      date(formatString: "MMMM Do, YYYY")
      desc
      image {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      slug
      id
    }
  }
}
`


SwiperCore.use([Navigation, Pagination, Autoplay])

const Main = () => {
  const heroRef = useRef(null)
  const scrollMouseRef = useRef(null)
  const scrollMouseTl = gsap.timeline({
    repeat: -1,
  })
  const scrollArrowRef = useRef(null)
  const scrollArrowTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1.5,
  })


  const {allStrapiBlogs: {nodes: recentBlogs}} = useStaticQuery(query)

  const blogSlides = recentBlogs.map((blog, i) => (
    <SwiperSlide key={blog.id} className={styles.slide}>
    {/* <SwiperSlide key={`slide${i}`} className={styles.slide}> */}
      <ImgContainer
        fluid={blog.image.childImageSharp.fluid}
        imgContainerClass={styles.slide_imgContainer}
        alt={blog.title}
      />
      <div className={styles.slide_imgOverlay}></div>
      <div className={styles.slide_desc}>
        <p className={["headline", styles.slide_descHeadline].join(" ")}>
          {blog.title}
        </p>
        <p className={styles.slide_descIntro}>
          {blog.desc}
        </p>
        <Link to={`/blog/${blog.slug}`} className={styles.slide_descLink}>Read more.</Link>
      </div>
    </SwiperSlide>
  ))


  useEffect(() => {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        id: "hero",
        // markers: true,
        start: "20% 80%",
        end: "80% 20%",
        toggleActions: "play pause resume pause",
      },
    })
    heroTl.from(
      heroRef.current,
      {
        duration: 0.5,
        y: 20,
        opacity: 0,
        ease: "power2.inOut",
      },
      "-=0.3"
    )

    scrollMouseTl
      .to(scrollMouseRef.current, {
        duration: 1,
        y: 10,
      })
      .to(
        scrollMouseRef.current.childNodes,
        {
          duration: 0.3,
          y: 10,
          yoyo: true,
          repeat: 3,
          ease: "circ.in",
        },
        "-=0.8"
      )
      .to(
        scrollMouseRef.current,
        {
          duration: 1,
          y: 0,
          ease: "power1.in",
        },
        "-=0.5"
      )

    scrollArrowTl.to(scrollArrowRef.current, {
      keyframes: [
        {
          duration: 0.3,
          ease: "power1.in",
          y: 10,
        },
        {
          duration: 0.15,
          ease: "power1.out",
          y: 0,
        },
        {
          duration: 0.3,
          ease: "power1.in",
          y: 8,
        },
        {
          duration: 0.15,
          ease: "power1.out",
          y: 0,
        },
      ],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const mqlForScroll = window.matchMedia("(max-width: 800px)")
    const toggleScrollAnim = e => {
      if (e.matches) {
        scrollMouseTl.pause()
        scrollArrowTl.play()
      } else {
        scrollMouseTl.play()
        scrollArrowTl.pause()
      }
    }
    mqlForScroll.addListener(toggleScrollAnim)
    toggleScrollAnim(mqlForScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main ref={heroRef} className={styles.hero}>
      <div className={["container", styles.container].join(" ")}>
        <div className={styles.wrapper}>
          <Swiper
            id="main"
            className={styles.slider}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
          >
            {blogSlides}
          </Swiper>
        </div>

        <div ref={scrollMouseRef} className={styles.mouse}>
          <div className={styles.mouse_scroll}></div>
        </div>

        <div ref={scrollArrowRef} className={styles.icon}>
          <MdKeyboardArrowDown className={styles.icon_arrow} />
        </div>
      </div>
    </main>
  )
}

export default Main
