import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

import "../../styles/arquitectura.scss"

const Arquitectura = ({ nextPath }) => {
  const data = useStaticQuery(graphql`
    query {
      pilatosImg: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-main.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralImg: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-main.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      setasImg: file(relativePath: { eq: "arquitectura/setas-main.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const initialImages = {
    pilatos: false,
    catedralSevilla: false,
    setas: false,
  }

  const [images, setImages] = useState(() => (
      sessionStorage.getItem('arquitectura') ?
      JSON.parse(sessionStorage.getItem('arquitectura')) :
      initialImages
    )
  )
  const nextRef = useRef(null)

  // useEffect(() => {
  //   const revealNext = setTimeout(() => {
  //     nextRef.current.style.display = "inline-block"
  //   }, 1600)

  //   return () => clearTimeout(revealNext)
  // }, [])

  useEffect(() => {
    sessionStorage.setItem('arquitectura', JSON.stringify(images))
  }, [images, setImages])

  const clickedClassName = (imageToCheck) => (
    images[imageToCheck] ? " clicked" : ""
  )

  const clickNextPath = () => {
    nextRef.current.setAttribute("disabled", true);
    nextPath();
  }

  const checkNext = () => {
    if (Object.values(images).some(x => x === true))
      return " reveal"
    else
      return ""
  }

  return (
    <div id="arquitectura">
      <main className="content">
        <div className="text">
          <div className="text_title">Arquitectura</div>
          <div className="text_body">
            The various styles of architecture found in Seville’s buildings is telling of its rich 
            Spanish history and
            culture. Here you will find wondrous displays of Moorish, Gothic,
            and even Modernist architecture.
          </div>
        </div>

        <div className="images">
          <div className="image-grid-1">
            <div
              className="image-container"
              onClick={() => {
                setImages(prev => ({ ...prev, pilatos: !prev.pilatos }))
              }}
            >
              <Img
                draggable={false}
                className={"image pilatos-image" + clickedClassName('pilatos')}
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.pilatosImg.childImageSharp.fluid}
              />
            </div>
          </div>
          <div className="image-grid-2">
            <div
              className="image-container"
              onClick={() => {
                setImages(prev => ({ ...prev, catedralSevilla: !prev.catedralSevilla }))
              }}
            >
              <Img
                draggable={false}
                className={"image catedral-image" + clickedClassName('catedralSevilla')}
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.catedralImg.childImageSharp.fluid}
              />
            </div>
            <div
              className="image-container-setas"
              onClick={() => {
                setImages(prev => ({ ...prev, setas: !prev.setas }))
              }}
            >
              <Img
                draggable={false}
                className={"image setas-image" + clickedClassName('setas')}
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.setasImg.childImageSharp.fluid}
              />
            </div>
          </div>
        </div>
      </main>

      <button ref={nextRef} className={"next-page-arquitectura" + checkNext()} onClick={clickNextPath}>
        next
      </button>
    </div>
  )
}

export default Arquitectura
