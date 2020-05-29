import React from "react"
import '../styles/index.scss'

// Component imports
import Footer from '../components/index/footer'
import Banner from '../components/index/banner'

const IndexPage = () => {
  return (
    <div id="base">
      <div className="intro-page">
        <div className="intro-page-text">
          <ul className="intro-page-text_title">
            <li>SEVILLA</li>
            <li>EN</li>
            <li>UN</li>
            <li>DIA</li>
          </ul>
          <div className="intro-page-text_author">
            design and code by <span id="duke-nguyen">Duke Nguyen</span>
          </div>
        </div>
      </div>
      <Banner />
      <Footer />
    </div>
  )
}

export default IndexPage
