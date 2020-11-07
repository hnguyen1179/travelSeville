import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "../../styles/card.scss"

const Card = ({ index, location, images, description }) => {
  // if location === 'centro' run this query below... 
  // const data = useStaticQuery(graphql`
  //     query {
  //       allImageSharp(filter: {fluid: {src: {regex: "/centro/"}}}) {
  //         edges {
  //           node {
  //             fluid(maxWidth: 800, quality: 90) {
  //               ...GatsbyImageSharpFluid
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `)

  
  // if location === 'arenal' run this query below ... 

  // repeat for every location . . .

  // console.log(data.allImageSharp.edges[0].node.fluid)

  // To Do:
  //  - Image generation... If portrait, keep 400px, if landscape make bigger ... 
  //  - Add Lettering to the Title -- Correlate to the map
  //  - Finish the carousel for pictures
  //  - Create a carousel for each card, flip animation? 

  return (
    <div className={`card card-${index}`}>
      <h1 className="card-title"> 
        {index + "."} {location} 
      </h1>
      <div className="card-body">
        <div className="card-carousel-container">
          <div className="card-carousel-slide">
            {
              images.map((image, index) => {
                return (
                  <div key={index}>
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

        <p className="card-description"> {description} </p>
      </div>
    </div>
  )
}

export default Card
