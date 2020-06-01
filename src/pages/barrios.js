import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import '../styles/barrios.scss'

const Barrios = () => {
    const data = useStaticQuery(graphql`
        query {
            centroImg: file(relativePath: { eq: "barrios/barrio-el-centro-main.png" }) {
                childImageSharp {
                    fluid(maxWidth: 800, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            arenalImg: file(relativePath: { eq: "barrios/barrio-el-arenal-main.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 800, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            santaCruzImg: file(relativePath: { eq: "barrios/barrio-santa-cruz-main.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            macarenaImg: file(relativePath: { eq: "barrios/barrio-macarena-main.png" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    const clickHandler = () => {
        Array.from(document.getElementsByClassName('image')).forEach( element => {
            element.style.opacity = "0";
        })
    }

    return (
      <div id="barrios">
        <svg className="red-bar"></svg>
        <main className="content">
          <div className="images">
            <div className="image-grid-1">
              <Img
                className="image santa-cruz-image"
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.santaCruzImg.childImageSharp.fluid}
              />
              <Img
                className="image centro-image"
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.centroImg.childImageSharp.fluid}
              />
            </div>
            <div className="image-grid-2">
              <Img
                className="image arenal-image"
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.arenalImg.childImageSharp.fluid}
              />
              <Img
                className="image macarena-image"
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.macarenaImg.childImageSharp.fluid}
              />
            </div>
          </div>

          <div className="text">
            <div className="text_title">barrios</div>
            <div className="text_body">
              Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
              iaculis. Nunc congue nisi vitae suscipit tellus mauris. Senectus
              et netus et malesuada fames ac. Purus faucibus ornare suspendisse
              sed nisi lacus sed.
            </div>
          </div>
        </main>
        <div className="next-page">
          <div onClick={() => clickHandler()}>Next</div>
        </div>
      </div>
    )
}

export default Barrios; 