import React, { forwardRef } from "react"

import Header from "./Header"
import Footer from "./Footer"

import "../../styles/base.scss"

const Layout = (props, ref) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer ref={ref} />
    </>
  )
}

export default forwardRef(Layout)
