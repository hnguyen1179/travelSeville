import React, { useRef, useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

// Libraries
import { InView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gsap, Power2 } from "gsap"

// Components
import DirectionsMap from "../components/day/DirectionsMap"
import Card from "../components/day/Card"

// Utils
import { geneticTSP } from "../utils/geneticTSP"
import locationNames from "../utils/locationNames"
import { summaries } from "../utils/locationSummaries"
import "../utils/fontAwesome.js"

// Style
import "../styles/day.scss"

const Day = () => {
  const data = useStaticQuery(graphql`
    query {
      centroImg1: file(relativePath: { eq: "barrios/barrio-el-centro-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      centroImg2: file(relativePath: { eq: "barrios/barrio-el-centro-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      centroImg3: file(relativePath: { eq: "barrios/barrio-el-centro-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg1: file(relativePath: { eq: "barrios/barrio-el-arenal-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg2: file(relativePath: { eq: "barrios/barrio-el-arenal-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg3: file(relativePath: { eq: "barrios/barrio-el-arenal-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      santaCruzImg1: file(
        relativePath: { eq: "barrios/barrio-santa-cruz-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      santaCruzImg2: file(
        relativePath: { eq: "barrios/barrio-santa-cruz-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      santaCruzImg3: file(
        relativePath: { eq: "barrios/barrio-santa-cruz-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      macarenaImg1: file(
        relativePath: { eq: "barrios/barrio-macarena-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      macarenaImg2: file(
        relativePath: { eq: "barrios/barrio-macarena-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      macarenaImg3: file(
        relativePath: { eq: "barrios/barrio-macarena-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg1: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg2: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg3: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralSevillaImg1: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralSevillaImg2: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralSevillaImg3: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      setasImg1: file(relativePath: { eq: "arquitectura/setas-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      setasImg2: file(relativePath: { eq: "arquitectura/setas-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      setasImg3: file(relativePath: { eq: "arquitectura/setas-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumFineArtsImg1: file(relativePath: { eq: "cultura/museum-fine-arts-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumFineArtsImg2: file(relativePath: { eq: "cultura/museum-fine-arts-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumFineArtsImg3: file(relativePath: { eq: "cultura/museum-fine-arts-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaEspanaImg1: file(relativePath: { eq: "cultura/plaza-de-espana-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaEspanaImg2: file(relativePath: { eq: "cultura/plaza-de-espana-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaEspanaImg3: file(relativePath: { eq: "cultura/plaza-de-espana-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImg1: file(
        relativePath: { eq: "historia/maria-luisa-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImg2: file(
        relativePath: { eq: "historia/maria-luisa-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImg3: file(
        relativePath: { eq: "historia/maria-luisa-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImg1: file(relativePath: { eq: "historia/real-alcazar-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImg2: file(relativePath: { eq: "historia/real-alcazar-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImg3: file(relativePath: { eq: "historia/real-alcazar-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  
  const [currentCard, setCurrentCard] = useState(1)
  const [waypoints, setWaypoints] = useState([])
  const [route, setRoute] = useState([])
  const [modal, setModal] = useState({
    open: false,
    images: null,
    index: 0
  })

  // Used in order to delay the count of the last card rendered being the currentCard
  const dumbRef = useRef(false)

  // Used in order to focus on the modal in order for keyboard keys to be registered automatically 
  // without having the user click onto the modal 
  const focusModalRef = useRef(null)

  // Returns an object with keys: location (proper name) & stopover
  const properName = locationName => {
    return { location: locationNames[locationName], stopover: true }
  }

  // Rearranges the order of the most efficient route to start with the neighborhood
  const rearrange = (bestConfig) => {
    const neighborhoods = ["santaCruz", "arenal", "macarena", "centro"]

    for (let i = 0; i < bestConfig.length; i++) {
      if (neighborhoods.includes(bestConfig[i])) {
        bestConfig = bestConfig.concat(bestConfig.splice(0, i))
        break
      }
    }

    return bestConfig
  }

  const refs = {
    cardRef1: useRef(null),
    cardRef2: useRef(null),
    cardRef3: useRef(null),
    cardRef4: useRef(null),
    cardRef5: useRef(null),
    cardRef6: useRef(null),
    cardRef7: useRef(null),
    cardRef8: useRef(null),
  }

  useEffect(() => {
    // Takes in an array of locations and returns an array of coordinates 
    const convertToLatLong = (bestConfig) => {
      let output = []
      for (let i = 0; i < bestConfig.length; i++) {
        output.push(properName(bestConfig[i]))
      }

      return output
    }
    
    window.scroll(0, 0)

    setTimeout(() => {
      dumbRef.current = true;
    }, 3000)

    const barrios = JSON.parse(sessionStorage.getItem("barrios"))
    const arquitectura = JSON.parse(sessionStorage.getItem("arquitectura"))
    const cultura = JSON.parse(sessionStorage.getItem("cultura"))
    const historia = JSON.parse(sessionStorage.getItem("historia"))

    const pointArray = [];
    
    try {
      pointArray.push(
        ...Object.keys(barrios).filter(point => barrios[point] === true)
      )
      pointArray.push(
        ...Object.keys(arquitectura).filter(point => arquitectura[point] === true)
      )
      pointArray.push(
        ...Object.keys(cultura).filter(point => cultura[point] === true)
      )
      pointArray.push(
        ...Object.keys(historia).filter(point => historia[point] === true)
      )
    } catch(err) {
      window.location.replace("/explore")
    }
  
    const bestConfig = geneticTSP(pointArray)

    let optimizedRoute = []
    
    // optimizedRoute consists of an array formed with points that are represented 
    // by their shortened location name. The order is most efficient, but does 
    // not start with the neighborhood 
    for (let i = 0; i < bestConfig.order.length; i++) {
      optimizedRoute.push(bestConfig.points[bestConfig.order[i]])
    }

    // This rearranges the optimized route so that it starts with the neighborhood
    optimizedRoute = rearrange(optimizedRoute)
    setRoute(optimizedRoute)

    const latLongOptimizedRoute = convertToLatLong(optimizedRoute)

    // waypoints is now an array of lat long object literals that starts off with the 
    // neighborhood being in the 0th index 
    setWaypoints(latLongOptimizedRoute)
  }, [])

  const openModal = (images, index) => {
    // Currently, the modal is isn't visible, and so focus can't be established.
    // Must set a timeout for the DOM to update for modal to be visible so focus
    // can take place
    setTimeout(() => focusModalRef.current.focus(), 0)
    gsap.from(`.modal`, { top: "40%", opacity: 0.8, duration: 0.8, ease: Power2.easeOut } )
    setModal({
      open: true,
      images: images,
      index: index
    })
  }

  const closeModal = () => {
    setModal({
      open: false,
      images: null,
      index: 0
    })
  }

  const nextImage = () => {
    let nextIndex = modal.index > 1 ? 0 : modal.index + 1
    setModal(prev => ({
      ...prev, 
      index: nextIndex}))
  }

  const previousImage = () => {
    let nextIndex = modal.index < 1 ? 2 : modal.index - 1
    setModal(prev => ({
      ...prev, 
      index: nextIndex
    }))
  }

  const handleKeyDown = (e) => {
    e.stopPropagation()
    switch (e.keyCode) {
      case 27:
        closeModal()
        break
      case 37:
        previousImage()
        break
      case 39:
        nextImage()
        break        
      default:
        break
    }
  }

  const restartDay = () => {
    sessionStorage.clear()
    window.location.replace("/explore")
  }

  return (
    <div id="day">
      <div id="yellow-page" />
      <div className="day-banner">
        <h1 className="day-title">
          Itinerary
        </h1>
      </div>

      <div className="day-content">
        <div className="day-map-container">
          {
            waypoints.length !== 0 && (
            <DirectionsMap
              cardRefs={refs}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
              origin={waypoints[0].location}
              destination={waypoints[waypoints.length - 1].location}
              waypoints={waypoints.slice(1, waypoints.length - 1)}
            />)
          }
        </div>

        {
          route.length !== 0 && ( 
          <ul className="card-container">
            {
              route.map((point, index) => {
                const images = [
                              data[`${point}Img1`].childImageSharp.fluid, 
                              data[`${point}Img2`].childImageSharp.fluid, 
                              data[`${point}Img3`].childImageSharp.fluid, 
                            ]
                const location = locationNames[point].replace(", Sevilla", "")
                
                return (
                  <li key={index} data-key={index} className={"gsap-card"} ref={refs[`cardRef${index + 1}`]}>
                    <InView threshold={0.8} onChange={(inView, entry) => {
                      if (dumbRef.current === true) setCurrentCard(index + 1)
                    }}> 
                      <Card 
                        index={index + 1} 
                        location={location} 
                        images={images} 
                        description={summaries[point]}
                        openModal={openModal}
                        closeModal={closeModal}
                      />
                    </InView>
                  </li>
                )
              })
            }
          </ul>)
        }
      </div>

      <div 
        className={`card-zoom-modal` + (modal.open ? ' modal-open' : '')}
        onClick={closeModal}
      >
        <div className="modal" ref={focusModalRef} role="button" tabIndex="0" onKeyDown={e => handleKeyDown(e)} onClick={e => e.stopPropagation()}>
          {
            modal.open ?
            <Img
              className={"modal-image"}
              draggable={false}
              fluid={modal.images[modal.index]}
              imgStyle={{
                objectFit: "contain",
              }}
            /> 
              : 
              null
          }
          <button className="modal-close-button" onClick={(e) => {
            e.stopPropagation()
            closeModal()
          }}>
            <FontAwesomeIcon icon="times" className="modal-close-icon"/>
          </button>
          <button aria-label="Previous image" className="modal-image-change-button modal-previous-button" onClick={previousImage} />
          <button aria-label="Next image" className="modal-image-change-button modal-next-button" onClick={nextImage} />
        </div>
      </div>

      <div className="day-footer">
        <div className="day-footer-extro">
          <h1 className="day-footer-title">
            I hope that you enjoyed your day in Seville!
          </h1>
          <div className="day-footer-restart" onClick={restartDay}>
            Planning another day? 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Day
