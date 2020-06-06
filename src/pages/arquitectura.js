import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import anime from "animejs"

import '../styles/arquitectura.scss'

const Arquitectura = () => {
    const data = useStaticQuery(graphql`
        query {
            pilatosImg: file(relativePath: { eq: "arquitectura/casa-de-pilatos-main.png" }) {
                childImageSharp {
                    fluid(maxWidth: 800, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            catedralImg: file(relativePath: { eq: "arquitectura/catedral-sevilla-main.jpg" }) {
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


    const [state, setState] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        anime({
          targets: ".rbs",
          d: [{ value: "M0 0h1920v732H0z" }],
          easing: "easeInOutQuint",
          //   translateY: CSS.height,
          delay: 1,
          duration: 1300,
          loop: false,
        })

        setState(state => !state)
      }, 1200)

      return () => clearTimeout(timer)
    }, [])

    return (
      <div id="arquitectura">
        {/* RED BAR SVG */}
        <svg className="red-bar-svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h1920v732.745H0z" fill="#aa151b" />
        </svg>

        {/* RED BAR DIV */}
        {/* <div className="red-bar"></div> */}

        <main className="content">
          <div className="text">
            <div className="text_title">arquitectura</div>
            <div className="text_body">
              Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
              iaculis. Nunc congue nisi vitae suscipit tellus mauris. Senectus
              et netus et malesuada fames ac. Purus faucibus ornare suspendisse
              sed nisi lacus sed.
            </div>
          </div>

          <div className="images">
            <div className="image-grid-1">
              <Img
                className="image pilatos-image"
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.pilatosImg.childImageSharp.fluid}
              />
            </div>
            <div className="image-grid-2">
              <Img
                className="image catedral-image"
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.catedralImg.childImageSharp.fluid}
              />
              <Img
                className="image setas-image"
                imgStyle={{
                  objectFit: "contain",
                }}
                fluid={data.setasImg.childImageSharp.fluid}
              />
            </div>
          </div>
        </main>
      </div>
    )
}

export default Arquitectura;