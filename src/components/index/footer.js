import React from "react"
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Footer = () => {
  return (
    <div className="footer">
      <AniLink
        cover
        to="/barrios"
        direction="up"
        duration={1.2}
        bg="#aa151b"
        className="footer-text"
      >
        Click to start
      </AniLink>
    </div>
  )
}

export default Footer
