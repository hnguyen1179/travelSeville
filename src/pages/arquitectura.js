import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// import anime from 'animejs/lib/anime.es.js'

import '../styles/arquitectura.scss'

const Arquitectura = () => {
    const data = useStaticQuery(graphql`
        query {
            pilatosImg: file(relativePath: { eq: "arquitectura/casa-de-pilatos-main.png" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 90) {
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
    // anime({
    //     targets: '.architecture-red-bar polygon',
    //     points: [
    //         {value: '0 0, 100 0, 100 100, 0 100, 0 0'},
    //         {value: '0 0, 50 0, 50 50, 0 50, 0 0'},
    //     ],
    //     easing: 'easeInQuad',
    //     duration: 3000
    // });

    return (
      <div id="arquitectura">
        <div className="red-bar"></div>
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
      // <div>
      //     <div className="container">
      //         <svg className="architecture-red-bar" viewBox="0 0 100 100" preserveAspectRatio="none">
      //             <polygon stroke="none" points="0 0, 100 0, 100 100, 0 100, 0 0"></polygon>
      //         </svg>
      //     </div>
      // </div>
    )
}

export default Arquitectura;