import React from "react"
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Footer = () => {
  return (
    <div className="footer">
        <AniLink paintDrip to="/barrios" className="footer-text">
            Click to start
        </AniLink>
    </div>
  )
}

export default Footer
