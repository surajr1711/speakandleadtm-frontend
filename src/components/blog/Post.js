import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import GatsbyImage from "gatsby-image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./post.module.scss"

gsap.registerPlugin(ScrollTrigger)

const BlogItem = ({
  node,
  post = styles.post,
  post_wrapper = styles.post_wrapper,
  post_img = styles.post_img,
  post_info = styles.post_info,
}) => {
  const postRef = useRef(null)
  useEffect(() => {
    gsap.from(postRef.current, {
      scrollTrigger: {
        trigger: postRef.current,
        start: "20% 80%",
        end: "80% 20%",
        // toggleActions: "play none resume pause",
      },
      y: 20,
      opacity: 0,
    })
  }, [])

  return (
    <li ref={postRef} className={post}>
      <Link to={`/blog/${node.slug}`} className={styles.post_link}>
        <div className={post_wrapper}>
          <div className={post_img}>
            <GatsbyImage fluid={node.image.childImageSharp.fluid} alt={node.title} />
          </div>
          <div className={post_info}>
            <small className={styles.post_infoDate}>{node.date}</small>
            <h3 className={styles.post_infoTitle}>{node.title}</h3>
            <p className={styles.post_infoAuthor}>by {node.author}</p>
            <p className={styles.post_infoDesc}>{node.desc}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BlogItem
