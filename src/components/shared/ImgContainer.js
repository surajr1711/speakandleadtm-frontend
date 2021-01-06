import React, { forwardRef } from "react"
import GatsbyImg from "gatsby-image"

import styles from "./imgContainer.module.scss"

const ImgContainer = (props, ref) => {
  const { fluid, alt, imgContainerClass } = props

  // useEffect(() => {
  //   const imgContainer = ref.current
  //   const gatsbyImgWrapper = imgContainer.childNodes[0]
  //   const gatsbyImgChildNodes = gatsbyImgWrapper.childNodes
  //   const imgElm = [...gatsbyImgChildNodes].find(
  //     node => node.nodeName === "IMG"
  //   )
  //   console.log(gatsbyImgWrapper, imgElm)
  // }, [])

  return (
    <div
      ref={ref}
      className={[styles.imgContainer, imgContainerClass].join(" ")}
    >
      <GatsbyImg fluid={fluid} className={styles.imgWrapper} alt={alt} />
    </div>
  )
}

export default forwardRef(ImgContainer)
