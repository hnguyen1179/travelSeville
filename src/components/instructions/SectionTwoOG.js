import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { TimelineLite, Power2 } from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"
import { Transition } from "react-transition-group"

// Components
import SevilleSpainMap from "./SevilleSpainMap"

// Style
import "../../styles/instructions.scss"
import { TweenMax } from "gsap/gsap-core"

const SectionTwo = () => {
  // States
  const [trigger, setTrigger] = useState({
    itemBackground: false,
    itemOne: false,
    itemTwo: false,
    itemThree: false,
    itemFour: false,
    itemFive: false,
    itemSix: false,
  })

  // Refs
  const itemBackgroundRef = useRef(null),
    itemOneRef = useRef(null),
    itemTwoRef = useRef(null),
    itemThreeRef = useRef(null),
    itemFourRef = useRef(null),
    itemFiveRef = useRef(null),
    itemSixRef = useRef(null)

  window.itemSixRef = itemSixRef;

  // Pseudoelement selectors
  const getPseudoRef = element => CSSRulePlugin.getRule(element)

  const itemOneImage = getPseudoRef("#block-one-image:after"),
    itemOneAside = getPseudoRef("#block-one-aside:after"),
    itemTwoImage = getPseudoRef("#seville-satellite-image:after"),
    itemThreeImage = getPseudoRef("#seville-spain-map-container:after"),
    itemThreeAside = getPseudoRef("#block-three-aside:after"),
    itemFourImage = getPseudoRef("#block-four-image:after"),
    itemFourAside = getPseudoRef("#block-four-aside:after"),
    itemFiveImage = getPseudoRef("#block-five-image:after"),
    itemFiveAside = getPseudoRef("#block-five-aside:after"),
    itemSixImage = getPseudoRef("#block-six-image:after"),
    itemSixAside = getPseudoRef("#block-six-aside:after")

  const topPos = element => element.getBoundingClientRect().top

  // Scrolling Animations
  useLayoutEffect(() => {
    const topPos = element => element.getBoundingClientRect().top

    const itemBackgroundPos = topPos(itemBackgroundRef.current),
      itemOnePos = topPos(itemOneRef.current),
      itemTwoPos = topPos(itemTwoRef.current),
      itemThreePos = topPos(itemThreeRef.current),
      itemFourPos = topPos(itemFourRef.current),
      itemFivePos = topPos(itemFiveRef.current),
      itemSixPos = topPos(itemSixRef.current)

    console.log("bg: " + itemBackgroundPos)
    console.log("one: " + itemOnePos)
    console.log("two: " + itemTwoPos)
    console.log("three: " + itemThreePos)
    console.log("four: " + itemFourPos)
    console.log("five: " + itemFivePos)
    console.log("six: " + itemSixPos)
    console.log("window-innerheight: " + window.innerHeight)
    console.log("window-positionY: " + window.scrollY)

    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight - 300
      console.log(window.scrollY + window.innerHeight)

      if (itemSixPos < scrollPosition) {
        setTrigger(previous => ({ ...previous, itemSix: true }))
      } else if (itemFivePos < scrollPosition) {
        setTrigger(previous => ({ ...previous, itemFive: true }))
      } else if (itemFourPos < scrollPosition) {
        setTrigger(previous => ({ ...previous, itemFour: true }))
      } else if (itemThreePos < scrollPosition) {
        setTrigger(previous => ({ ...previous, itemThree: true }))
      } else if (itemTwoPos < scrollPosition) {
        setTrigger(previous => ({ ...previous, itemTwo: true }))
      } else if (itemOnePos < scrollPosition) {
        setTrigger(previous => ({ ...previous, itemOne: true }))
      } else if (itemBackgroundPos < scrollPosition) {
        setTrigger(previous => ({ ...previous, itemBackground: true }))
      }
    }

    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  // Utility Functions
  const slideAnimation = (duration, delay) => ({
    width: "0%",
    duration: duration,
    ease: Power2.easeInOut,
    delay: delay || 0,
  })

  return (
    <>
      <article className="content">
        <Transition
          timeout={3000}
          in={trigger.itemBackground}
          onEnter={() => {
            TweenMax.to(".section-two .section-title", {
              height: "100%",
              duration: 1.8,
              ease: Power2.easeOut,
            })
          }}
        >
          <header>
            <div className="section-title-container">
              <h1 ref={itemBackgroundRef} className="section-title">
                Background
              </h1>
            </div>
          </header>
        </Transition>

        <Transition
          timeout={3000}
          in={trigger.itemOne}
          onEnter={() => {
            const tl = new TimelineLite()
            tl.to(".block-one figure", { opacity: 1, left: 40, duration: 1.2, ease: Power2.easeInOut })
              .to(itemOneImage, slideAnimation(1, -0.6))
              .from(".block-one-image img", {
                scale: 1.2,
                duration: 1.2,
                ease: Power2.easeInOut,
                delay: -1.2
              })
              .to(itemOneAside, slideAnimation(1.2, -0.6))
          }}
        >
          <section ref={itemOneRef} className="blocks block-one">
            <figure />
            <aside className="block-one-aside" id="block-one-aside">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
                recusandae excepturi aut, neque enim facilis tenetur voluptas
                sint voluptatum modi.
              </p>
            </aside>
            <div className="block-one-image" id="block-one-image">
              <img
                draggable={false}
                src={require("../../images/instructions/seville-history-2.jpg")}
              />
            </div>
          </section>
        </Transition>

        <Transition
          timeout={3000}
          in={trigger.itemTwo}
          onEnter={() => {
            const tl = new TimelineLite()
            tl.to(itemTwoImage, slideAnimation(2))
          }}
        >
          <section className="blocks block-two">
            <div ref={itemTwoRef} className="seville-satellite-image" id="seville-satellite-image"></div>
            <aside className="block-two-aside">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, nemo similique dolore non iste atque sed consequatur
                cum dignissimos ratione!
              </p>
            </aside>
          </section>
        </Transition>

        <Transition
          timeout={3000}
          in={trigger.itemThree}
          onEnter={() => {
            const tl = new TimelineLite()
            tl.to(".block-three figure", {
              opacity: 1,
              right: "auto",
              duration: 2,
              ease: Power2.easeInOut
            })
              .to(itemThreeImage, slideAnimation(2, -1))
              .from(".block-three-image img", {
                scale: 1.2,
                duration: 1.2,
                ease: Power2.easeInOut,
              }, "-=1.2")
              .to(itemThreeAside, slideAnimation(1.2, -1))
          }}
        >
          <section ref={itemThreeRef} className="blocks block-three">
            <figure />
            <map className="seville-spain-map-container" id="seville-spain-map-container">
              {/* <SevilleSpainMap /> */}
              <img
                id="google-maps-placeholder"
                src={require("../../images/instructions/google-maps-placeholder.png")}
                alt="google maps"
              />
            </map>
            <aside className="block-three-aside" id="block-three-aside">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
                maxime odit reprehenderit praesentium laboriosam facere
                voluptatibus aut expedita quibusdam magni?
              </p>
            </aside>
          </section>
        </Transition>

        <Transition
          timeout={3000}
          in={trigger.itemFour}
          onEnter={() => {
            const tl = new TimelineLite()
            tl.to(".block-four figure", {
              opacity: 1,
              left: "auto",
              duration: 2,
              ease: Power2.easeInOut
            })
              .to(itemFourImage, slideAnimation(1))
              .from(".block-four-image img", {
                scale: 1.2,
                duration: 1.2,
                ease: Power2.easeInOut,
              }, "-=1.2")
              .to(itemFourAside, slideAnimation(1))
          }}
        >
          <section ref={itemFourRef} className="blocks block-four">
            <figure />
            <div className="block-four-image" id="block-four-image">
              <img
                draggable={false}
                src={require("../../images/instructions/seville-history-3.jpg")}
              />
            </div>
            <aside className="block-four-aside" id="block-four-aside">
              <p>
                
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
                maxime odit reprehenderit praesentium laboriosam facere
                voluptatibus aut expedita quibusdam magni?
              </p>
            </aside>
          </section>
        </Transition>

        <Transition
          timeout={3000}
          in={trigger.itemFive}
          onEnter={() => {
            const tl = new TimelineLite()
            tl.to(".block-five figure", {
              opacity: 1,
              right: "auto",
              duration: 2,
              ease: Power2.easeInOut
            })
              .to(itemFiveImage, slideAnimation(1))
              .from(".block-five-image img", {
                scale: 1.2,
                duration: 1.2,
                ease: Power2.easeInOut,
              }, "-=1.2")
              .to(itemFiveAside, slideAnimation(1))
          }}
        >
          <section className="blocks block-five">
            <figure ref={itemFiveRef} />
            <div className="block-five-image" id="block-five-image">
              <img
                draggable={false}
                src={require("../../images/instructions/seville-history-1.jpg")}
              />
            </div>
            <aside className="block-five-aside" id="block-five-aside">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
                maxime odit reprehenderit praesentium laboriosam facere
                voluptatibus aut expedita quibusdam magni?
              </p>
            </aside>
          </section>
        </Transition>


        <Transition
          timeout={3000}
          in={trigger.itemSix}
          onEnter={() => {
            const tl = new TimelineLite()
            tl.to(".block-six figure", {
              opacity: 1,
              left: "auto",
              duration: 2,
              ease: Power2.easeInOut
            })
              .to(itemSixImage, slideAnimation(1))
              .from(".block-six-image img", {
                scale: 1.2,
                duration: 1.2,
                ease: Power2.easeInOut,
              }, "-=1.2")
              .to(itemSixAside, slideAnimation(1))
          }}
        >
          <section className="blocks block-six">
            <figure ref={itemSixRef} />
            <div className="block-six-image" id="block-six-image">
              <img
                draggable={false}
                src={require("../../images/instructions/seville-history-4.jpeg")}
              />
            </div>
            <aside className="block-six-aside" id="block-six-aside">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
                maxime odit reprehenderit praesentium laboriosam facere
                voluptatibus aut expedita quibusdam magni?
              </p>
            </aside>
          </section>
        </Transition>
      </article>
    </>
  )
}

export default SectionTwo
