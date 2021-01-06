import { gsap } from "gsap"

export const textAnim = ref => {
  const textAnimTl = gsap.timeline()
  textAnimTl.from(
    [...ref.current.childNodes].filter(
      node => node.nodeName === "P" || "A" || "LI" || "H3"
    ),
    {
      stagger: 0.15,
      autoAlpha: 0,
      y: 20,
      duration: 0.45,
    }
  )
  return textAnimTl
}
