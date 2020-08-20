import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { geneticTSP } from "../utils/geneticTSP"

import Img from "gatsby-image"

// Style
import "../styles/day.scss"

const Day = () => {
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
      <ul>
        {bestConfig.order.map(index => {
          return (
            <li>
              {pointArray[index]}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Day
