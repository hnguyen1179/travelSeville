import React, { useState } from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { gsap, Power2 } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Transition } from "react-transition-group"

// Style
import "../../styles/instructions.scss"

// Registering GSAP Plugins
gsap.registerPlugin(ScrollTrigger)

const SectionThree = ({ currentSection, chevronType }) => {
  // States
  const [clicked, setClicked] = useState(false)

  // Event actions
  const onClick = () => {
    setClicked(previous => !previous)
  }

  // Utility functions
  const slideAnimation = (duration, delay) => ({
    width: "0%",
    duration: duration,
    ease: Power2.easeInOut,
    delay: delay || 0,
  })

  gsap.to(".section-three .section-title", {
    scrollTrigger: ".section-three",
    height: "100%",
    duration: 1.8,
    ease: Power2.easeInOut
  })

  gsap.to("#how-to-image-cover", {
    scrollTrigger: "#how-to-image-cover",
    width: "0%",
    duration: 0.8,
    ease: Power2.easeInOut,
  })

  const stepOneTL = gsap.timeline({scrollTrigger: ".one-number"})

  stepOneTL.to("#one-number", slideAnimation(0.8), "+=1")
           .to("#one-main", slideAnimation(0.8, -0.4))
           .to("#one-sub-one", slideAnimation(0.4, -0.4))

  return (
    <>
      <article className="content">
        <header>
            <div className="section-title-container">
              <h1 className="section-title">Instructions</h1>
            </div>
        </header>
        <main>
          <section className="instructions">
                <div className="instructions-head">
                  <div className="instructions-number one-number"><div id="one-number"/>1.</div>
                  <div className="instructions-main one-main"><div id="one-main"/>Click on images that appeal to you</div>
                </div>
            <div className="instructions-subtext one-sub-one"><div id="one-sub-one" />Hint: click on the image to the left </div>
            <div className="instructions-subtext one-sub-two"><div id="one-sub-two" />Selected images will darken when selected</div>

                <Transition
                  timeout={3000}
                  in={clicked}
                  onEnter={() => {
                    const tl = gsap.timeline()
                    tl.to("#one-sub-two", slideAnimation(0.8))
                      .to("#two-number", slideAnimation(0.8, 0.2))
                      .to("#two-main", slideAnimation(0.8, -0.4))
                      .to("#two-sub", slideAnimation(0.8, -0.4))
                  }}
                >
                  <>
                    <div className="instructions-head">
                      <div className="instructions-number two-number"><div id="two-number"/>2.</div>
                      <div className="instructions-main two-main"><div id="two-main"/>Follow the links for the next page</div>
                    </div>
                    <div className="instructions-subtext two-sub"><div id="two-sub"/>That's it! That's all you need to do </div>
                  </>
                </Transition>
          </section>
        
            <div className="how-to-image-cover">
              <div id="how-to-image-cover" />
              <img
                className={clicked ? "clicked" : ""}
                draggable={false}
                onClick={onClick}
                src={require("../../images/instructions/how-to-image.jpg")}
              />
            </div>
  

        </main>
      </article>

      {
        <div id="og-chevron" className={chevronType()}>
          {currentSection === "three" ? "" : "scroll down"}
        </div>
      }

      <Transition
        timeout={1000}
        onEnter={() => {
          gsap.to("#og-chevron", { visibility: "hidden" })
        }}
        onExited={() => {
          gsap.to("#og-chevron", { visibility: "visible" })
        }}
        mountOnEnter
        unmountOnExit
        in={clicked}
        addEndListener={(node, done) => {
          gsap.to(node, 0.5, {
            autoAlpha: clicked ? 1 : currentSection !== "three" ? 1 : 0,
            onComplete: done,
          })
        }}
      >
        <AniLink
          cover
          to="/explore"
          direction="left"
          duration={2}
          bg="#f1bf00"
          className={chevronType()}
        >
          {currentSection === "three" ? "next page" : "scroll down"}
        </AniLink>
      </Transition>
    </>
  )
}

export default SectionThree
