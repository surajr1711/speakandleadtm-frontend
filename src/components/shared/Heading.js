import React, { forwardRef } from "react"

import styles from "./heading.module.scss"

const Heading = (props, ref) => {
  Heading.defaultProps = { title: "test", elmClass: "" }
  const { title, elmClass } = props
  // console.log(elmClass)
  return (
    <div ref={ref} className={[styles.heading, elmClass].join(" ")}>
      <h2>{title}</h2>
    </div>
  )
}

export default forwardRef(Heading)
