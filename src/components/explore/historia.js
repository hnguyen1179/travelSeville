import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Img from "gatsby-image"

import "../../styles/historia.scss"

const Historia = ({ nextPath }) => {
  const data = useStaticQuery(graphql`
    query {
      mariaLuisaImage: file(
        relativePath: { eq: "historia/maria-luisa-main.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImage: file(
        relativePath: { eq: "historia/real-alcazar-main.png" }
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
    mariaLuisa: false,
    alcazar: false,
  }

  const [images, setImages] = useState(() => (
    sessionStorage.getItem('historia') ?
      JSON.parse(sessionStorage.getItem('historia')) :
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
    sessionStorage.setItem('historia', JSON.stringify(images))
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
    <div id="historia">
      <main className="content">
        <div className="text">
          <div className="text_title">Historia</div>
          <div className="text_body">
            One of the things that make Seville, Spain so unique is that it was
            ruled by various major parties in 
            history, of which were the Romans, Muslims, and Spanish people. It’s
            seen many highs in lows in its past and many of the landmarks around
            Seville reflect that.
          </div>
        </div>
        <div className="images">
          <div
            className="image-container"
            onClick={() => {
              setImages(prev => ({ ...prev, alcazar: !prev.alcazar }))
            }}
          >
            <Img
              draggable={false}
              className={"image real-alcazar-image" + clickedClassName('alcazar')}
              imgStyle={{
                objectFit: "contain",
              }}
              fluid={data.alcazarImage.childImageSharp.fluid}
            />
          </div>
          <div
            className="image-container"
            onClick={() => {
              setImages(prev => ({ ...prev, mariaLuisa: !prev.mariaLuisa }))
            }}
          >
            <Img
              draggable={false}
              className={"image maria-luisa-image" + clickedClassName('mariaLuisa')}
              imgStyle={{
                objectFit: "contain",
              }}
              fluid={data.mariaLuisaImage.childImageSharp.fluid}
            />
          </div>
        </div>
      </main>
      
      <AniLink
        cover
        to="/day"
        direction="left"
        duration={2}
        bg="#f1bf00"
        className={"next-page" + checkNext()}
      >
        done
      </AniLink>
    </div>
  )
}

export default Historia