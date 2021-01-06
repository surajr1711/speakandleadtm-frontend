import React, {useEffect, useRef} from 'react'
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from 'gatsby-image'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Heading from '../shared/Heading'
import { headingAnim } from "../../hooks/headingAnim"
import "swiper/swiper-bundle.css"
import styles from './testimonials.module.scss'

gsap.registerPlugin(ScrollTrigger)

const query = graphql`
  {
    strapiHome {
      testimonials {
        title
      }
    }
    allStrapiTestimonials {
      nodes {
        name
        occupation
        desc
				date(formatString: "MMM Do, YYYY")
				image {
					childImageSharp {
						fluid(maxWidth: 300, maxHeight: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
      }
    }
  }
`

SwiperCore.use([Navigation, Pagination, Autoplay])

const Testimonials = () => {
	const tmHeadingRef = useRef(null)
	const {
		strapiHome: {testimonials: tmSection}, 
		allStrapiTestimonials: {nodes: allTms}
	} = useStaticQuery(query)

	const tmSlides = allTms.map((tm, i) => (
		<SwiperSlide 
			key={`tmSlide-${i}`}
			tag={`article`}
			className={styles.tmSlide}
		>
			<div className={styles.tmSlide_head}>
				<div className={styles.tmSlide_image}>
					<GatsbyImage 
						fluid={tm.image.childImageSharp.fluid}
						alt={tm.name}
					/>
				</div>
				<div className={styles.tmSlide_dtls}>
					<p className={styles.tmSlide_dtlsName}>{tm.name}</p>
					<p className={styles.tmSlide_dtlsOccu}>{tm.occupation}</p>
				</div>
			</div>

			<div className={styles.tmSlide_cont}>
				<p className={styles.tmSlide_contDesc}>"{tm.desc}"</p>
				<p className={styles.tmSlide_contDate}>{tm.date}</p>
			</div>

		</SwiperSlide>
	))

	useEffect(() => {
		const tmTl = gsap.timeline({
			scrollTrigger: {
        trigger: tmHeadingRef.current,
        id: "testimonials",
        // markers: true,
        start: "20% 80%",
        end: "80% 20%",
        toggleActions: "play pause resume pause",
			},
		})
		tmTl.add(headingAnim(tmHeadingRef))
	}, [])
	// useEffect(() => {
	// 	console.log(tmSection, allTms);
	// }, [])

	return (
		<section className={styles.testimonials}>
			<div className="container">

				<div className={styles.headingDiv}>
					<Heading
						ref={tmHeadingRef}
						title={tmSection.title}
						elmClass={styles.heading}
					/>
				</div>

				<Swiper 
					id="tmSlider"
					tag="div"
					className={styles.wrapper}
					spaceBetween={0}
					slidesPerView={1}
					slidesPerGroup={1}
					// navigation
					pagination={{ clickable: true }}
					autoplay={{ delay: 5000 }}
					breakpoints={{
						// 425: {
						// 	navigation: true
						// },
						// 600: {
						// 	spaceBetween: 20,
						// 	slidesPerView: 2,
						// 	slidesPerGroup: 2,
						// },
						1200: {
							slidesPerView: 2,
							slidesPerGroup: 2,
						},
						// 1000: {
						// 	spaceBetween: 40,
						// 	slidesPerView: 3,
						// 	slidesPerGroup: 3,
						// },
						// 1200: {
						// 	spaceBetween: 50,
						// 	slidesPerView: 4,
						// 	slidesPerGroup: 4,
						// },
						1500: {
							slidesPerView: 3,
							slidesPerGroup: 3,
						},
					}}
				>
					{tmSlides}
				</Swiper>
			</div>
		</section>
	)
}

export default Testimonials
