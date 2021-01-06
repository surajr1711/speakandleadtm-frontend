import { gsap } from "gsap"
// import {CSSRulePlugin} from 'gsap/CSSRulePlugin'

export const imgAnim = (ref, args) => {
  const imgAnimTl = gsap.timeline()
  // const imgContainer = ref.current
  const gatsbyImgWrapper = ref.current.childNodes[0]
  // const gatsbyImgChildNodes = gatsbyImgWrapper.childNodes
  // const imgElm = [...gatsbyImgWrapper.childNodes].find(
  //   node => node.nodeName === "IMG"
  // )
  // console.log(imgElm)

  imgAnimTl
    // .from(
    //   gatsbyImgWrapper,
    //   {
    //     scaleX: 0,
    //     transformOrigin: "left",
    //     ease: "power3.out",
    //     duration: 0.75,
    //   },
    //   "-=0.6"
    // )
    .from(
      gatsbyImgWrapper,
      {
        x: args.x,
        y: args.y,
        ease: "power2.out",
        duration: 0.6,
      }
      // "-=0.3"
    )
  // .from(
  //   imgElm,
  //   {
  //     ease: "expo.out",
  //     duration: 0.75,
  //     xPercent: -110,
  //     yPercent: 110,
  //   },
  //   "-=0.6"
  // )
  // .from(
  //   imgElm,
  //   {
  //     scale: 1.2,
  //     duration: 1,
  //   },
  //   "-=0.45"
  // )
  return imgAnimTl
}
