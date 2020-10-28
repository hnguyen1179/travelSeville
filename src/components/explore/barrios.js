import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

import "../../styles/barrios.scss"

const Barrios = ({ nextPath }) => {
  const data = useStaticQuery(graphql`
    query {
      centroImg: file(
        relativePath: { eq: "barrios/barrio-el-centro-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg: file(
        relativePath: { eq: "barrios/barrio-el-arenal-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      santaCruzImg: file(
        relativePath: { eq: "barrios/barrio-santa-cruz-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      macarenaImg: file(
        relativePath: { eq: "barrios/barrio-macarena-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const initialImages = {
    santaCruz: false,
    centro: false,
    arenal: false,
    macarena: false,
  }

  const [images, setImages] = useState(() =>
    sessionStorage.getItem("barrios")
      ? JSON.parse(sessionStorage.getItem("barrios"))
      : initialImages
  )

  const nextRef = useRef(null)

  // useEffect(() => {
  //   const revealNext = setTimeout(() => {
  //     if (Object.values(images).some(x => x === true)) {
  //       nextRef.current.style.display = "inline-block"
  //     }
  //   }, 1600)

  //   return () => clearTimeout(revealNext)
  // }, [])

  useEffect(() => {
    sessionStorage.setItem("barrios", JSON.stringify(images))
  }, [images, setImages])

  const clickedClassName = imageToCheck => (
    images[imageToCheck] ? " clicked" : ""
  )
  const clickNextPath = () => {
    nextRef.current.setAttribute("disabled", true)
    nextPath()
  }

  const checkNext = () => {
    if (Object.values(images).some(x => x === true))
      return " reveal"
    else 
      return ""
  }

  return (
    <div id="barrios">
      <main className="content">
        <div className="images">
          <div className="image-grid-1">
            <div
              className="image-container"
              onClick={() => {
                setImages(prev => ({
                  ...initialImages,
                  santaCruz: !prev.santaCruz,
                }))
              }}
            >
              <Img
                draggable={false}
                className={"santa-cruz-image" + clickedClassName("santaCruz")}
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.santaCruzImg.childImageSharp.fluid}
              />
            </div>
            <div
              className="image-container"
              onClick={() => {
                setImages(prev => ({ ...initialImages, centro: !prev.centro }))
              }}
            >
              <Img
                draggable={false}
                className={"centro-image" + clickedClassName("centro")}
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.centroImg.childImageSharp.fluid}
              />
            </div>
          </div>
          <div className="image-grid-2">
            <div
              className="image-container"
              onClick={() => {
                setImages(prev => ({ ...initialImages, arenal: !prev.arenal }))
              }}
            >
              <Img
                draggable={false}
                className={"arenal-image" + clickedClassName("arenal")}
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.arenalImg.childImageSharp.fluid}
              />
            </div>
            <div
              className="image-container"
              onClick={() => {
                setImages(prev => ({
                  ...initialImages,
                  macarena: !prev.macarena,
                }))
              }}
            >
              <Img
                draggable={false}
                className={"macarena-image" + clickedClassName("macarena")}
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.macarenaImg.childImageSharp.fluid}
              />
            </div>
          </div>
        </div>

        <div className="text">
          <div className="text_title">Barrios</div>
          <div className="text_body">
            Seville’s neighborhoods have it all: great historical monuments, the
            city’s most charming streets and squares, colorful markets, tranquil
            parks and amazing tapas joints.
          </div>
        </div>
      </main>

      <button ref={nextRef} className={"next-page" + checkNext()} onClick={clickNextPath}>
        next
      </button>
    </div>
  )
}

export default Barrios
