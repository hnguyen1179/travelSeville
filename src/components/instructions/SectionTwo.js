import React from "react"
import { gsap, Power2 } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Components
import SevilleSpainMap from "./SevilleSpainMap"

// Style
import "../../styles/instructions.scss"

// Registering GSAP Plugins
gsap.registerPlugin(ScrollTrigger)

const SectionTwo = () => {
  // Utility Functions
  const slideAnimation = (duration, delay) => ({
    width: "0%",
    duration: duration,
    delay: delay || 0,
    ease: Power2.easeOut
  })

  const imageZoomAnimation = (duration, delay) => ({
    scale: 1.2,
    duration: duration,
    ease: Power2.easeInOut,
    delay: delay || 0,
  })

  const objectTriggerPoint = "top"
  const viewPortTriggerPoint = "center"

  // Animations
  gsap.to("#background", {
    scrollTrigger: {
      trigger: "#background",
      start: `${objectTriggerPoint} ${viewPortTriggerPoint}`,
    },
    height: "100%",
    duration: 1.2,
    ease: Power2.easeInOut
  })

  const blockOneTL = gsap.timeline({scrollTrigger: {
    trigger: ".block-one",
    start: `${objectTriggerPoint} ${viewPortTriggerPoint}`,
  }})

  const startTime = 0.8
  const figureDuration = 0.6
  const coverDuration = 0.8
  
  // The perfect animation sequence timing
  blockOneTL.to(".block-one figure", { width: "95%", duration: figureDuration, ease: Power2.easeInOut })
            .addLabel("start", startTime)
            .to("#block-one-image-cover", slideAnimation(coverDuration), "start")
            .from(".block-one-image img", imageZoomAnimation(1.2, -1.4))
            .to("#block-one-aside-cover", slideAnimation(coverDuration), "start")

  gsap.to("#seville-satellite-image-cover", {
    scrollTrigger: {
      trigger: "#seville-satellite-image-cover",
      start: `${objectTriggerPoint} ${viewPortTriggerPoint}`
    },
    width: "0%",
    duration: 1.2,
    ease: Power2.easeInOut
  })

  const blockThreeTL = gsap.timeline({scrollTrigger: {
    trigger: ".block-three",
    start: `${objectTriggerPoint} ${viewPortTriggerPoint}`,
  }})

  blockThreeTL.to(".block-three figure", { width: "90%", duration: figureDuration, ease: Power2.easeInOut })
              .addLabel("start", startTime)
              .to("#block-three-image-cover", slideAnimation(coverDuration), "start")
              .to("#block-three-aside-cover", slideAnimation(coverDuration), "start")
  
  const blockFourTL = gsap.timeline({scrollTrigger: {
    trigger: ".block-four",
    start: `${objectTriggerPoint} ${viewPortTriggerPoint}`,
  }})

  blockFourTL.to(".block-four figure", { width: "85%", duration: figureDuration, ease: Power2.easeInOut })
             .addLabel("start", startTime)
             .to("#block-four-image-cover", slideAnimation(coverDuration), "start")
             .to(".block-four-image img", imageZoomAnimation(1.2, -1.4))
             .to("#block-four-aside-cover", slideAnimation(coverDuration), "start")
  
  const blockFiveTL = gsap.timeline({scrollTrigger: {
    trigger: ".block-five",
    start: `${objectTriggerPoint} ${viewPortTriggerPoint}`,
  }})

  blockFiveTL.to(".block-five figure", { width: "90%", duration: figureDuration, ease: Power2.easeInOut })
             .addLabel("start", startTime)
             .to("#block-five-image-cover", slideAnimation(coverDuration), "start")
             .to(".block-five-image img", imageZoomAnimation(1.2, -1.4))
             .to("#block-five-aside-cover", slideAnimation(coverDuration), "start")

  const blockSixTL = gsap.timeline({scrollTrigger: {
    trigger: ".block-six",
    start: `${objectTriggerPoint} ${viewPortTriggerPoint}`,
  }})

  blockSixTL.to(".block-six figure", { width: "100%", duration: figureDuration, ease: Power2.easeInOut })
            .addLabel("start", startTime)
            .to("#block-six-image-cover", slideAnimation(coverDuration), "start")
            .to(".block-six-image img", imageZoomAnimation(1.2, -1.4))
            .to("#block-six-aside-cover", slideAnimation(coverDuration), "start")
  
  return (
    <>
      <article className="content">
        <header>
          <div className="section-title-container">
            <h1 className="section-title" id="background">
              Background
            </h1>
          </div>
        </header>

        <section className="blocks block-one">
          <figure />
          <aside className="block-one-aside">
            <div id="block-one-aside-cover" />
            <p>
              Seville is most often lauded as the quintessential Spanish city. It's known to be the cultural center 
              of European society in the 15th c. during the Age of Exploration with travelers flocking in from all parts of 
              the old world.

            </p>
          </aside>
          <div className="block-one-image">
            <div id="block-one-image-cover">
            </div>
            <img
              draggable={false}
              src={require("../../images/instructions/seville-history-2.jpg")}
            />
          </div>
        </section>

        <section className="blocks block-two">
          <div className="seville-satellite-image">
            <div id="seville-satellite-image-cover"/>
          </div>
          <aside className="block-two-aside">
            <p>
              With a population of over 700,000 residents, Seville sits in the fertile valley of the Guadalquivir river and lies
              in the southwestern region of the Iberian Peninsula. 
            </p>
          </aside>
        </section>

        <section className="blocks block-three">
          <figure />
          <map
            className="seville-spain-map-container"
          >
            <div id="block-three-image-cover" />
            <SevilleSpainMap />
            {/* <img
              id="google-maps-placeholder"
              src={require("../../images/instructions/google-maps-placeholder.png")}
              alt="google maps"
            /> */}
          </map>
          <aside className="block-three-aside">
            <div id="block-three-aside-cover" />
            <p>
              Seville is the capital city of Andalusia, a large autonomous region in the south of Spain. 
              Andalusia was known to be under Muslim rule during the Umayyad conquest of Spain. Remnants of 
              this history still exists all over the region and is found in the architecture, food and culture.
            </p>
          </aside>
        </section>

        <section className="blocks block-four">
          <figure />
          <div className="block-four-image">
            <div id="block-four-image-cover" />
            <img
              draggable={false}
              src={require("../../images/instructions/seville-history-3.jpg")}
            />
          </div>
          <aside className="block-four-aside">
            <div id="block-four-aside-cover"/>
            <p>
              Being once the cultural center, Seville is the birth place of tapas and flamenco dancing. Here, 
              you can find every aspect of Spanish culture, including bullrunning, lively festivals and the sound of rich 
              Spanish guitars along its narrow streets.
            </p>
          </aside>
        </section>

        <section className="blocks block-five">
          <figure />
          <div className="block-five-image">
            <div id="block-five-image-cover" />
            <img
              draggable={false}
              src={require("../../images/instructions/seville-history-1.jpg")}
            />
          </div>
          <aside className="block-five-aside">
            <div id="block-five-aside-cover" />
            <p>
              Due to its rich history of being under Christian and Muslim rule, 
              grand displays of Gothic architecture can be found intermixed with Moorish architecture throughout the city.
            </p>
          </aside>
        </section>

        <section className="blocks block-six">
          <figure />
          <div className="block-six-image">
            <div id="block-six-image-cover" />
            <img
              draggable={false}
              src={require("../../images/instructions/seville-history-4.jpeg")}
            />
          </div>
          <aside className="block-six-aside">
            <div id="block-six-aside-cover" />
            <p>
              It's distinct style of architecture is prominent in many movies and shows. You might 
              recognize this scene from the once-popular HBO series <i>Game of Thrones</i>.
            </p>
          </aside>
        </section>
        
      </article>
    </>
  )
}

export default SectionTwo
