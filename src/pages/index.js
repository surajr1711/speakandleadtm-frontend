import React from "react"
// import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/shared/Layout"
import Main from "../components/index/Main"
import Mission from "../components/index/Mission"
import About from "../components/index/About"
import Session from "../components/index/Session"
import Learn from "../components/index/Learn"
import Testimonials from "../components/index/Testimonials"

const Index = () => {
  return (
    <Layout>
      <Main />
      <Mission />
      <About />
      <Session />
      <Learn />
      <Testimonials /> 
      {/* <Leader /> */}
    </Layout>
  )
}

export default Index
