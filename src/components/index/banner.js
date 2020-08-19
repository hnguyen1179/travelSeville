import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Banner = () => {
  const data = useStaticQuery(graphql`
    query {
      hotelImage: file(relativePath: { eq: "index/hotel.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      neighborhoodImage: file(relativePath: { eq: "index/neighborhood.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const title = useRef()

  useEffect(() => {
    setTimeout(() => title.current.classList.add("transitioned"), 1000)
  }, [])

  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="left-image">
            <Img fluid={data.hotelImage.childImageSharp.fluid} />
          </div>

          <div className="text-box">
            <ul ref={title} className="banner-title">
              <li>SEVILLA</li>
              <li>EN</li>
              <li>UN</li>
              <li>DIA</li>
            </ul>

            <div className="banner-body">
              Sevilla en un dia, or a day in Seville, is a guide to help you
              plan out a single day in <br /> Seville, Spain. <br />
              From this, I hope you will get <br />a newfound appreciation for
              Spanish culture and some <br />
              <span id="wanderlust">wanderlust</span>
            </div>
          </div>

          <div className="right-image">
            <Img fluid={data.neighborhoodImage.childImageSharp.fluid} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
