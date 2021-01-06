import React, { useRef } from "react"
import { graphql } from "gatsby"
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ReactMarkdown from 'react-markdown'
import GatsbyImage from "gatsby-image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Layout from "../components/shared/Layout"

import styles from "./blogTpl.module.scss"

gsap.registerPlugin(ScrollTrigger)

export const query = graphql`
  query($slug: String!) {
    strapiBlogs(slug: { eq: $slug }) {
      title
      date(formatString: "MMMM Do, YYYY")
      author
      body
      image {
        childImageSharp {
          fluid(maxWidth: 720, maxHeight: 480) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

const BlogTpl = props => {
  const blog = props.data.strapiBlogs
  // const post = props.data.contentfulBlogPost
  // const options = {
  //   renderNode: {
  //     "embedded-asset-block": node => {
  //       const alt = node.data.target.fields.title["en-US"]
  //       const url = node.data.target.fields.file["en-US"].url
  //       return <img alt={alt} src={url} />
  //     },
  //   },
  // }

  const blogPostRef = useRef(null)

  // useEffect(() => {
  //   blogPostRef.current.childNodes.forEach(node => {
  //     gsap.from(node, {
  //       scrollTrigger: {
  //         trigger: node,
  //         start: "20% 80%",
  //         end: "80% 20%",
  //       },
  //       y: 20,
  //       opacity: 0,
  //     })
  //   })
  // }, [])

  return (
    <Layout>
      
      <div
        ref={blogPostRef}
        className={["container", styles.container].join(" ")}
      >
        <small className={styles.date}>{blog.date}</small>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.author}>{blog.author}</p>
        <GatsbyImage
          fluid={blog.image.childImageSharp.fluid}
          alt={blog.image.title}
          className={styles.image}
        />
        <ReactMarkdown
          source={blog.body}
          transformImageUri={uri => uri.startsWith("http") ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
        />
      </div>
    </Layout>
  )
}

export default BlogTpl
