import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/shared/Layout"
import Post from "../components/blog/Post"

import styles from "./blog.module.scss"

const query = graphql`
{
  allStrapiBlogs(sort: {order: DESC, fields: date}) {
    nodes {
      title
      author
      date(formatString: "MMMM Do, YYYY")
      desc
      image {
        childImageSharp {
          fluid(maxWidth: 300, maxHeight: 200) {
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

const Blog = () => {
  const data = useStaticQuery(query)

  // useEffect(() => {
  //   console.log(data)
  // }, [])

  return (
    <Layout>
      <div className={["container", styles.container].join(" ")}>

        <h2>Blog articles</h2>
        <ol className={styles.list}>
          {data.allStrapiBlogs.nodes.map(node => (
            <Post key={node.id} node={node} />
          ))}
        </ol>
      </div>
    </Layout>
  )
}

export default Blog
