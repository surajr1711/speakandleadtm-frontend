import { gsap } from "gsap"

export const headingAnim = ref => {
  const headingAnimTl = gsap.timeline()
  headingAnimTl
    .from(ref.current, {
      duration: 1,
      scaleX: 0,
      transformOrigin: "left",
      ease: "expo.inOut",
    })
    .from(
      ref.current.childNodes,
      {
        y: "200%",
        duration: 0.6,
        ease: "expo.out",
      },
      "-=0.2"
    )
  return headingAnimTl
}
