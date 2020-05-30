import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import '../styles/barrios.scss'

const Barrios = () => {
    const data = useStaticQuery(graphql`
        query {
            centroImg: file(relativePath: { eq: "barrio-el-centro-main.png" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            arenalImg: file(relativePath: { eq: "barrio-el-arenal-main.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            santaCruzImg: file(relativePath: { eq: "barrio-santa-cruz-main.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            macarenaImg: file(relativePath: { eq: "barrio-macarena-main.png" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 90) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return (
      <div id="base">
        <div className="red-bar"></div>
        <main className="barrios-content">
            <div className="barrios-images">
                <Img
                    className="centro-image"
                    fluid={data.centroImg.childImageSharp.fluid}
                />
                <Img
                        className="santa-cruz-image"
                        fluid={data.santaCruzImg.childImageSharp.fluid}
                    />
                <Img
                    className="arenal-image"
                    fluid={data.arenalImg.childImageSharp.fluid}
                />
                <Img
                    className="macarena-image"
                    fluid={data.macarenaImg.childImageSharp.fluid}
                />
            </div>

            <div className="barrios-text">
                <div className="barrios-text_title">barrios</div>
                <div className="barrios-text_body">
                        Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis.
                        Nunc congue nisi vitae suscipit tellus mauris. Senectus et netus et
                        malesuada fames ac. Purus faucibus ornare suspendisse sed nisi lacus
                        sed.
                </div>
            </div>
        </main>
      </div>
    )
}

export default Barrios; 