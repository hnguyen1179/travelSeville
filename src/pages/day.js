import React, { useRef, useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { geneticTSP } from "../utils/geneticTSP"
import DirectionsMap from "../components/day/DirectionsMap"
import normalizedLatLongData from "../utils/latLongDataNormalized"

import Img from "gatsby-image"

// Style
import "../styles/day.scss"

const Day = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const barrios = JSON.parse(sessionStorage.getItem("barrios"))
    const arquitectura = JSON.parse(sessionStorage.getItem("arquitectura"))
    const cultura = JSON.parse(sessionStorage.getItem("cultura"))
    const historia = JSON.parse(sessionStorage.getItem("historia"))
  
    const pointArray = []
  
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
  }, [])

  // useEffect(() => {

  // }, [])

  // const pointArray = [
  //   "santaCruz",
  //   "centro",
  //   "macarena",
  //   "arenal",
  //   "pilatos",
  //   "catedralSevilla",
  //   "setas",
  //   "plazaEspana",
  //   "museumFineArts",
  //   "mariaLuisa",
  //   "alcazar",
  // ]



  // const testingHash = {}
  
  // for (let i = 0; i < 300; i++) {
  //   const bestConfig = geneticTSP(pointArray)
  //   if (!testingHash[bestConfig.distance]) {
  //     testingHash[bestConfig.distance] = 1;
  //   } else {
  //     testingHash[bestConfig.distance] += 1;
  //   }

  //   console.log(testingHash)
  // }

  // console.log(testingHash)
  // To do:
  /**
   *
   * Do a graphQL query of all the necessary images based on the object keys
   * that register as true
   *
   * Import a list of coordinates from a separate files which store each
   * location's coordinates' latitude and longitude on Google Mappointar
   *
   * Create a shortest path algorithm using the LAT(X) & LONG(Y) on a grid; use
   * distance formula, etc
   *
   * Using Google Map's API to plan a route based on the shortest path created
   *
   */

  return (
    <>
      <div>hi</div>
      {/* <ul>
        {bestConfig.order.map(index => {
          return (
            <li>
              {pointArray[index]}
            </li>
          )
        })}
      </ul> */}
      {/* <DirectionsMap id="googleMaps">

      </DirectionsMap> */}

      <canvas ref={canvasRef} width="800" height="800">

      </canvas>
    </>
  )
}

export default Day
