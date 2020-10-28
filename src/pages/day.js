import React, { useRef, useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { geneticTSP } from "../utils/geneticTSP"
import DirectionsMap from "../components/day/DirectionsMap"
// import latLongData from "../utils/latitudeLongitude"
import locationNames from "../utils/locationNames"
import normalizedLatLongData from "../utils/latLongDataNormalized"

import Img from "gatsby-image"

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
      catedralImg1: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralImg2: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralImg3: file(
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
      museumImg1: file(relativePath: { eq: "cultura/museum-fine-arts-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumImg2: file(relativePath: { eq: "cultura/museum-fine-arts-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumImg3: file(relativePath: { eq: "cultura/museum-fine-arts-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaImg1: file(relativePath: { eq: "cultura/plaza-de-espana-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaImg2: file(relativePath: { eq: "cultura/plaza-de-espana-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaImg3: file(relativePath: { eq: "cultura/plaza-de-espana-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImage1: file(
        relativePath: { eq: "historia/maria-luisa-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImage2: file(
        relativePath: { eq: "historia/maria-luisa-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImage3: file(
        relativePath: { eq: "historia/maria-luisa-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImage1: file(relativePath: { eq: "historia/real-alcazar-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImage2: file(relativePath: { eq: "historia/real-alcazar-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImage3: file(relativePath: { eq: "historia/real-alcazar-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const canvasRef = useRef(null)
  const [waypoints, setWaypoints] = useState([])
  const [route, setRoute] = useState([])

  const properName = locationName => {
    return { location: locationNames[locationName], stopover: true }
  }

  // Rearranges the order of the most efficient route to start with the neighborhood
  // AND also converts each name into a lat/lng obj literal for google waypoints 
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

  const convertToLatLong = (bestConfig) => {
    let output = []
    for (let i = 0; i < bestConfig.length; i++) {
      output.push(properName(bestConfig[i]))
    }

    return output
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

    // This creates a line representation of the most efficient path generated with 
    // the genetic algorithm 
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.beginPath()
    for (let i = 0; i < bestConfig.order.length; i++) {
      let pointName = pointArray[bestConfig.order[i]]
      let x = normalizedLatLongData[pointName][0] * 5
      let y = normalizedLatLongData[pointName][1] * 5 + 30

      if (i === 0) {
        ctx.moveTo(x, y)
        ctx.fillRect(x, y, 5, 5)
        ctx.font = "15px Arial"
        ctx.fillText(pointName, x, y + 20)
      } else {
        ctx.lineTo(x, y)
        ctx.fillRect(x, y, 5, 5)
        ctx.font = "15px Arial"
        ctx.fillText(pointName, x, y + 20)
      }
    }

    ctx.closePath()
    ctx.stroke()

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
  
  return (
    <>
      {waypoints.length !== 0 ? (
        <DirectionsMap
          id="googleMaps"
          origin={waypoints[0].location}
          destination={waypoints[waypoints.length - 1].location}
          waypoints={waypoints.slice(1, waypoints.length - 1)}
        />
      ) : null}

      {route.length !== 0 ? (
        <ul>
          {
            route.map(point => {
              return (
                <li>
                  {point}
                </li>
              )
            })
          }
        </ul>
      ): null}

      <canvas ref={canvasRef} width="800" height="800" />
    </>
  )
}

export default Day
