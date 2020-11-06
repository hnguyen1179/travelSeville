import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { TimelineLite, Power2 } from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"

// Components
import SectionTwo from "../components/instructions/SectionTwo"
import SectionThree from "../components/instructions/SectionThree"

// Utils
import useEventListener from "../utils/useEventListener"

// Style
import "../styles/instructions.scss"

const Instructions = () => {
  const titleUnderline = CSSRulePlugin.getRule("#seville:after")

  // States
  const [currentSection, setCurrentSection] = useState("one")

  // Refs
  const thirdSectionRef = useRef(null)
  const secondSectionRef = useRef(null)

  const height = () => {
    return (window.innerHeight * 2) + secondSectionRef.current.getBoundingClientRect().height
  }

  // For Chevron purposes
  useEventListener(window, "scroll", () => {
    const firstBreak = height() * 0.0074
    const secondBreak = height() - (window.innerHeight * 2) + (window.innerHeight * 0.03)

    if (thirdSectionRef.current.getBoundingClientRect().top <= 0) {
      setCurrentSection("three")
    } else if (window.scrollY < firstBreak || window.scrollY > secondBreak) {
      setCurrentSection("one")
    } else if (window.scrollY >= firstBreak && window.scrollY <= secondBreak) {
      setCurrentSection("two")
    }
  })

  // Animations for first panel
  useEffect(() => {    
    if (sessionStorage.getItem("reload")) {
      const tl = new TimelineLite()
  
      tl
        .delay(0.5)
        .from(".section-one > .content div", { height: 0, stagger: 0.3, duration: 0.8 })
        .from(titleUnderline, { width: "0%" }, "-=0.3")
        .to(".chevron", { opacity: 1, duration: 0.7 }, "-=0.3")
        .to("#main", { className: "" }, "-=0.2")
    } else {
      sessionStorage.setItem("reload", "reloaded")
      window.location.reload()
    }

  }, [])

  const chevronType = () => {
    switch (currentSection) {
      case "two":
        return "chevron chevron-two"
      case "one":
        return "chevron chevron-one"
      case "three":
        return "chevron chevron-three"
    }
  }

  return (
    <div id="instructions">
      <main id="main" className="hidden">
        <section className="section-one">
          <article className="content">
            <div className="section-title title-top">
              <div className="text-top">Before we start, let's</div>
            </div>
            <div className="section-title title-bot">
              <div className="text-bottom">get acquianted with</div>
            </div>
            <div className="section-title title-seville">
              <div className="seville" id="seville">Seville, Spain</div>
            </div>
          </article>
        </section>

        <section className="section-two" ref={secondSectionRef}>
          <SectionTwo />
        </section>

        <section className="section-three" ref={thirdSectionRef}>
          <SectionThree 
            currentSection={currentSection} 
            chevronType={chevronType}
          />
        </section>
      </main>
    </div>
  )
}

export default Instructions
