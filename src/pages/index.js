import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

// Style
import "../styles/index.scss"

// Component imports
import Banner from "../components/index/banner"

const IndexPage = () => {
  return (
    <div id="index">
      <div className="intro-page">
        <div className="intro-page-text">
          <div className="intro-page-text_author">
            design and code by <span id="duke-nguyen">Duke Nguyen</span>
          </div>
        </div>
      </div>

      <Banner />

      <div className="footer">
        <AniLink
          cover
          to="/instructions"
          direction="left"
          duration={2}
          bg="#aa151b"
          className="footer-text"
        >
          next page
        </AniLink>
      </div>
    </div>
  )
}

export default IndexPage
