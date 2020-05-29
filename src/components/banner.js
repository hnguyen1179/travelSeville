import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Banner = () => {
    const data = useStaticQuery(graphql`
        query {
            hotelImage: file(relativePath: { eq: "hotel.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            neighborhoodImage: file(relativePath: { eq: "neighborhood.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    document.addEventListener('DOMContentLoaded', function () {
      document.getElementsByClassName('left-image').setAttribute('draggable', false);
      document.getElementsByClassName('right-image').setAttribute('draggable', false);
      console.log("hit this");
    })

    return (
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="left-image">
              <Img fluid={data.hotelImage.childImageSharp.fluid} />
            </div>

            <div className="text-box">
              <div className="banner-title">Sevilla En Un Dia</div>
              <div className="banner-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
