import React, { useRef, useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

// Libraries
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

// Components
import DirectionsMap from "../components/day/DirectionsMap"
import Card from "../components/day/Card"
import Img from "gatsby-image"

// Utils
import { geneticTSP } from "../utils/geneticTSP"
import locationNames from "../utils/locationNames"
import normalizedLatLongData from "../utils/latLongDataNormalized"
import { summaries } from "../utils/locationSummaries"

// Style
import "../styles/day.scss"

const Day = () => {
  const data = useStaticQuery(graphql`
    query {
      centroImg1: file(relativePath: { eq: "barrios/barrio-el-centro-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      centroImg2: file(relativePath: { eq: "barrios/barrio-el-centro-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      centroImg3: file(relativePath: { eq: "barrios/barrio-el-centro-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg1: file(relativePath: { eq: "barrios/barrio-el-arenal-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg2: file(relativePath: { eq: "barrios/barrio-el-arenal-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg3: file(relativePath: { eq: "barrios/barrio-el-arenal-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
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
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg2: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg3: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
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
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumFineArtsImg2: file(relativePath: { eq: "cultura/museum-fine-arts-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumFineArtsImg3: file(relativePath: { eq: "cultura/museum-fine-arts-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaEspanaImg1: file(relativePath: { eq: "cultura/plaza-de-espana-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaEspanaImg2: file(relativePath: { eq: "cultura/plaza-de-espana-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaEspanaImg3: file(relativePath: { eq: "cultura/plaza-de-espana-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImg1: file(
        relativePath: { eq: "historia/maria-luisa-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImg2: file(
        relativePath: { eq: "historia/maria-luisa-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImg3: file(
        relativePath: { eq: "historia/maria-luisa-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImg1: file(relativePath: { eq: "historia/real-alcazar-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImg2: file(relativePath: { eq: "historia/real-alcazar-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImg3: file(relativePath: { eq: "historia/real-alcazar-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  
  const [currentCard, setCurrentCard] = useState(1)
  const [waypoints, setWaypoints] = useState([])
  const [route, setRoute] = useState([])

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

  // Takes in an array of locations and returns an array of coordinates 
  const convertToLatLong = (bestConfig) => {
    let output = []
    for (let i = 0; i < bestConfig.length; i++) {
      output.push(properName(bestConfig[i]))
    }

    return output
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
    const barrios = JSON.parse(sessionStorage.getItem("barrios"))
    const arquitectura = JSON.parse(sessionStorage.getItem("arquitectura"))
    const cultura = JSON.parse(sessionStorage.getItem("cultura"))
    const historia = JSON.parse(sessionStorage.getItem("historia"))

    const pointArray = [];
    
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

  useEffect(() => {
    console.log(currentCard)
  }, currentCard)

  // TO DO;
  /** 1. Work out the react-scroll library and get it working
   *      - Scrolling down will switch the 'active' marker; red 
   *      - Clicking on markers will automatically scroll you to the card
   * 
   *  2. Carousel working
   *  3. Stylize the UI 
   * 
   **/


  return (
    <div id="day">
      <div id="yellow-page" />
      <div className="day-banner">
        <h1 className="day-title">
          Itinerary
        </h1>
      </div>

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

      <div className="day-content">
        {/* 
          Placeholder gives the illusion that the Map's position: fixed 
          allows for relative position, rather than absolute positioning
        */}
        <div className="day-map-placeholder"/>

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
                  <li key={index} ref={refs[`cardRef${index + 1}`]}>
                    <Card index={index + 1} location={location} images={images} description={summaries[point]}/>
                  </li>
                )
              })
            }
          </ul>)
        }

      </div>
    </div>
  )
}

export default Day
