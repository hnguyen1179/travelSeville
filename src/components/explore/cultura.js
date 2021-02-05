import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

import "../../styles/cultura.scss"

const Cultura = ({ nextPath, disableNext }) => {
  const data = useStaticQuery(graphql`
    query {
      museumImg: file(
        relativePath: { eq: "cultura/museum-fine-arts-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaImg: file(
        relativePath: { eq: "cultura/plaza-de-espana-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  
  const initialImages = {
    plazaEspana: false,
    museumFineArts: false,
  }

  let sessionObject = false;
  if (typeof window !== 'undefined') {
    sessionObject = sessionStorage.getItem('cultura')
  }

  const [images, setImages] = useState(() => (
      sessionObject ?
      JSON.parse(sessionObject) :
      initialImages
    )
  )

  const nextRef = useRef(null)

  useEffect(() => {
    sessionStorage.setItem('cultura', JSON.stringify(images))
  }, [images, setImages])

  const clickedClassName = (imageToCheck) => (
    images[imageToCheck] ? " clicked" : ""
  )

  const clickNextPath = () => {
    nextRef.current.setAttribute("disabled", true);
    nextPath();
  }

  const checkNext = () => {
    if (Object.values(images).some(x => x === true)) {
      return " reveal"
    } else {
      return ""
    }
  }

  return (
    <div id="cultura">
      <main className="content">
        <div className="images">
          <div
            className="image-container-plaza"
            role="button"
            tabIndex="0"
            onClick={() => {
              setImages(prev => ({ ...prev, plazaEspana: !prev.plazaEspana }))
            }}
            onKeyDown={() => {
              setImages(prev => ({ ...prev, plazaEspana: !prev.plazaEspana }))
            }}
          >
            <Img
              draggable={false}
              className={"image plaza-de-espana-image" + clickedClassName('plazaEspana')}
              imgStyle={{
                objectFit: "contain",
              }}
              fluid={data.plazaImg.childImageSharp.fluid}
            />
          </div>
          <div
            className="image-container"
            role="button"
            tabIndex="0"
            onClick={() => {
              setImages(prev => ({ ...prev, museumFineArts: !prev.museumFineArts }))
            }}
            onKeyDown={() => {
              setImages(prev => ({ ...prev, museumFineArts: !prev.museumFineArts }))
            }}
          >
            <Img
              draggable={false}
              className={"image museum-fine-arts-image" + clickedClassName('museumFineArts')}
              imgStyle={{
                objectFit: "contain",
              }}
              fluid={data.museumImg.childImageSharp.fluid}
            />
          </div>
        </div>

        <div className="text">
          <div className="text_title">Cultura</div>
          <div className="text_body">
            As an inland port, Seville is the chief city of the Andalusia
            province and the 4th largest city in Spain. Seville was important in
            history as the cultural center of the Spanish world, the capital of
            Muslim Spain, and also the heart of the Spanish exploration of the
            New World.
          </div>
        </div>
      </main>

      {
        disableNext ? 
        null :
        <button ref={nextRef} className={"next-page" + checkNext()} onClick={clickNextPath}>
          next
        </button>
      }
    </div>
  )
}

export default Cultura;