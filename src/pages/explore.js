// Imports
import React, { useState, useEffect, useRef } from "react"

// Libraries
import { useSpring, animated } from "react-spring"
import { interpolate } from "flubber"
import { Transition, CSSTransition } from "react-transition-group"
import { gsap } from "gsap"

// Pages Rendered
import Barrios from "../components/explore/barrios"
import Arquitectura from "../components/explore/arquitectura"
import Cultura from "../components/explore/cultura"
import Historia from "../components/explore/historia"

// Stylesheets Used
import "../styles/barrios.scss"
import "../styles/arquitectura.scss"
import "../styles/cultura.scss"
import "../styles/historia.scss"
import "../styles/explore.scss"

const Explore = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [pathIndex, setPathIndex] = useState(3)
  const [activated, setActivated] = useState(false)
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0)
  const [contentMounted, setContentMounted] = useState(true)
  const [disableNext, setDisableNext] = useState(false)

  const tabsRef = useRef()

  const firstHalf = useSpring({
    from: { t: 0 },
    to: { t: 0.5 },
    reset: true,
    config: { duration: 500 },
  })
  const secondHalf = useSpring({
    from: { t: 0.5 },
    to: { t: 1 },
    reset: true,
    config: { duration: 500 },
  })

  useEffect(() => {
    // Allows SVG to be resized on window resize
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    })

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      })
    }
  }, [])

  // SVG's between pages loaded
  const paths = [
    `M0 0 h${width} v250 h-${width} z`, // Barrios Red Bar
    `M0 340 h${width} v${height - 340} h-${width} z`, // Arquitectura Red Bar
    `M${width * 0.5} 0 h400 v${height * 0.8} h-400 z`, // Cultura Red Bar
    `M${width * 0.5 - 500} ${height * 0.15} h500 v${
      height - height * 0.15
    } h-500 z`, // Historia Red Bar
  ]

  const interpolator = interpolate(
    paths[pathIndex],
    paths[currentTab] || paths[0],
    { maxSegmentLength: false }
  )

  const nextPath = nextTabIndex => {
    setDisableNext(true)

    if (currentTab === nextTabIndex) {
      // Do nothing; same tab
    } else {
      tabsRef.current.childNodes.forEach(button => {
        button.setAttribute("disabled", "disabled")
      })

      setContentMounted(false) // Triggers an unmount of the "Content" div
      setActivated(true) // Animates the red bar to morph to the next tab

      if (nextTabIndex === undefined) {
        // Clicked "Next"
        setPathIndex(currentTab)
        setCurrentTab(prevIndex =>
          prevIndex + 1 >= paths.length ? 0 : prevIndex + 1
        )
      } else {
        // Clicked on a "Tab"
        setPathIndex(currentTab)
        setCurrentTab(nextTabIndex)
      }

      // This turns the SVG into a static path after the animation is ran; static path allows it to
      // be resized when window is resized
      setTimeout(() => {
        setActivated(false)
        tabsRef.current.childNodes.forEach(button =>
          button.removeAttribute("disabled")
        )
        setDisableNext(false)
      }, 1600)
    }
  }

  return (
    <div id="explore">
      <svg className="red-bar-svg">
        {activated ? (
          contentMounted ? (
            <animated.path d={secondHalf.t.interpolate(interpolator)} />
          ) : (
            <animated.path d={firstHalf.t.interpolate(interpolator)} />
          )
        ) : (
          <path d={paths[currentTab]} />
        )}
        )
      </svg>

      <div className="content">
        <CSSTransition
          in={contentMounted && currentTab === 0}
          timeout={500}
          classNames={"barrios-"}
          unmountOnExit={true}
          onExited={() => setContentMounted(true)}
        >
          <Barrios nextPath={nextPath} disableNext={disableNext} />
        </CSSTransition>

        <CSSTransition
          in={contentMounted && currentTab === 1}
          timeout={500}
          classNames={"arquitectura-"}
          unmountOnExit={true}
          onExited={() => setContentMounted(true)}
        >
          <Arquitectura nextPath={nextPath} disableNext={disableNext} />
        </CSSTransition>

        <CSSTransition
          in={contentMounted && currentTab === 2}
          timeout={500}
          classNames={"cultura-"}
          unmountOnExit={true}
          onExited={() => setContentMounted(true)}
        >
          <Cultura nextPath={nextPath} disableNext={disableNext} />
        </CSSTransition>

        <CSSTransition
          in={contentMounted && currentTab === 3}
          timeout={500}
          classNames={"historia-"}
          unmountOnExit={true}
          onExited={() => setContentMounted(true)}
        >
          <Historia disableNext={disableNext} />
        </CSSTransition>
      </div>

      <div ref={tabsRef} className="tabs">
        <button className="tabs-barrios" onClick={() => nextPath(0)}> Barrios </button>

        <Transition
          timeout={1000}
          onEnter={() => {
            gsap.to(".tabs-arquitectura", { visibility: "visible", opacity: 1 })
          }}
          in={currentTab === 1}
        >
          <button className="tabs-arquitectura" onClick={() => nextPath(1)}> Arquitectura </button>
        </Transition>

        <Transition
          timeout={1000}
          onEnter={() => {
            gsap.to(".tabs-cultura", { visibility: "visible", opacity: 1 })
          }}
          in={currentTab === 2}
        >
          <button className="tabs-cultura" onClick={() => nextPath(2)}> Cultura </button>
        </Transition>

        <Transition
          timeout={1000}
          onEnter={() => {
            gsap.to(".tabs-historia", { visibility: "visible", opacity: 1 })
          }}
          in={currentTab === 3}
        >
          <button className="tabs-historia" onClick={() => nextPath(3)}> Historia </button>
        </Transition>
      </div>
    </div>
  )
}

export default Explore