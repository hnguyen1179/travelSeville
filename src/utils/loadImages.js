export const images = graphql`
    query {
      centroImg1: file(relativePath: { eq: "../images/barrios/barrio-el-centro-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      centroImg2: file(relativePath: { eq: "barrios/barrio-el-centro-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      centroImg3: file(relativePath: { eq: "barrios/barrio-el-centro-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg1: file(relativePath: { eq: "barrios/barrio-el-arenal-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg2: file(relativePath: { eq: "barrios/barrio-el-arenal-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      arenalImg3: file(relativePath: { eq: "barrios/barrio-el-arenal-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      santaCruzImg1: file(
        relativePath: { eq: "barrios/barrio-santa-cruz-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      santaCruzImg2: file(
        relativePath: { eq: "barrios/barrio-santa-cruz-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      santaCruzImg3: file(
        relativePath: { eq: "barrios/barrio-santa-cruz-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      macarenaImg1: file(
        relativePath: { eq: "barrios/barrio-macarena-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      macarenaImg2: file(
        relativePath: { eq: "barrios/barrio-macarena-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      macarenaImg3: file(
        relativePath: { eq: "barrios/barrio-macarena-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg1: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg2: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pilatosImg3: file(
        relativePath: { eq: "arquitectura/casa-de-pilatos-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralImg1: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralImg2: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catedralImg3: file(
        relativePath: { eq: "arquitectura/catedral-sevilla-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      setasImg1: file(relativePath: { eq: "arquitectura/setas-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      setasImg2: file(relativePath: { eq: "arquitectura/setas-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      setasImg3: file(relativePath: { eq: "arquitectura/setas-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumImg1: file(relativePath: { eq: "cultura/museum-fine-arts-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumImg2: file(relativePath: { eq: "cultura/museum-fine-arts-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      museumImg3: file(relativePath: { eq: "cultura/museum-fine-arts-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaImg1: file(relativePath: { eq: "cultura/plaza-de-espana-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaImg2: file(relativePath: { eq: "cultura/plaza-de-espana-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      plazaImg3: file(relativePath: { eq: "cultura/plaza-de-espana-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImage1: file(
        relativePath: { eq: "historia/maria-luisa-1.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImage2: file(
        relativePath: { eq: "historia/maria-luisa-2.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mariaLuisaImage3: file(
        relativePath: { eq: "historia/maria-luisa-3.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImage1: file(relativePath: { eq: "historia/real-alcazar-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImage2: file(relativePath: { eq: "historia/real-alcazar-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alcazarImage3: file(relativePath: { eq: "historia/real-alcazar-3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `