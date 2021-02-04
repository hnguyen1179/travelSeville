import React, { useRef, useState } from 'react'
import Img from "gatsby-image"

// Libraries
import { debounce } from "lodash"
import { gsap, Power2 } from "gsap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import "../../utils/fontAwesome.js"

// Styles
import "../../styles/card.scss"

const Card = ({ index, location, images, description, openModal }) => {
  // Admittedly a janky solution to properly pinpoint Alcazar on the map so it 
  // doesn't overlap with Catedral
  if (location === "37.383069, -5.990140") location = "Real Alcázar de Sevilla";
  
  const [currentPicture, setCurrentPicture] = useState(0)

  const imageClick = (e, index) => {
    e.stopPropagation()
    openModal(images, index)
  }

  const left = () => {
    gsap.to(`.slide-${index}`, { translateX: "+=100%", duration: 0.4, ease: Power2.easeInOut } )
    setCurrentPicture(currentPicture - 1)    
  }

  const right = () => {
    gsap.to(`.slide-${index}`, { translateX: "+=-100%", duration: 0.4, ease: Power2.easeInOut } )
    setCurrentPicture(currentPicture + 1)    
  }

  // Timer is a ref set outside of the function because the setCurrentPicture
  // call will rerender the function causing the timer to reset to 0, which will
  // allow the function to be immediatelly called again. The way the lodash debouncer
  // works relies on a functional scoped timer, which gets resetted in our case due 
  // to the rerender. Refs aren't reset on rerender
  const timer = useRef(0)
  const leadingDebouncer = (fx, delay) => {
    return () => {
      if (Date.now() - timer.current > delay) fx()
      timer.current = Date.now()
    }
  }

  return (
    <div className={`card card-${index}`}>
      <div className="card-body">
        <div className="card-carousel-overlay-container">
          <div className="card-carousel-container">
              <div className={`card-carousel-slide slide-${index}`}>
                {
                  images.map((image, index) => {
                    return (
                      <div key={index} className={"card-carousel-image-container"} onClick={debounce((e) => imageClick(e, index), 1000, { 'leading': true, 'trailing': false })}>
                        <Img
                          className={"card-image"}
                          draggable={false}
                          fluid={image}
                          imgStyle={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )
                  })
                }
              </div>
          </div>

          <div className="card-carousel-container-below">
            {currentPicture > 0 ? 
            <FontAwesomeIcon className={"card-arrow card-click-left"} onClick={leadingDebouncer(left, 500)} icon={"angle-left"}/>
            : null}
            {currentPicture < 2 ? 
            <FontAwesomeIcon className={"card-arrow card-click-right"} onClick={leadingDebouncer(right, 500)} icon={"angle-right"}/>  
            : null}

            <div className="card-dots">
              {
                images.map((image, index) => {
                  return (
                    <div className={currentPicture === index ? 'dot active' : 'dot'}/>
                  )
                })
              }
            </div>
          </div>
        </div>
        
        <aside className="card-description">
          <h1 className="card-title"> 
            {location} 
          </h1>
          <p > {description} </p>
        </aside>
      </div>
    </div>
  )
}

export default Card
