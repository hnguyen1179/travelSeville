import React, { useState } from "react"

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
  Marker
} from "@react-google-maps/api"

// Utils
import "../../utils/fontAwesome.js"

// Styles
import MapStyle from "../../styles/SevilleSpainMap"

// Images
import yellowMarker from "./yellow-circle.png"
import redMarker from "./red-circle.png"


const options = {
  styles: MapStyle,
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: false,
}

const libraries = [
  "places"
]

const yellowMarkerObject = {
  url: yellowMarker,
  scaledSize: {
    height: 32,
    width: 32
  }
}

const redMarkerObject = {
  url: redMarker,
  scaledSize: {
    height: 32,
    width: 32
  }
}

const DirectionsMap = ({ cardRefs, currentCard, setCurrentCard, origin, destination, waypoints }) => {
  const [response, setResponse] = useState(null);
  const [question, setQuestion] = useState(false)

  const { isLoaded, LoadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAc8YDdPQeS05YQbUPqdUQS7T2nbaXmSsc',
    libraries: libraries,
  })

  const directionsOption = {
    travelMode: 'WALKING',
    origin: origin,
    destination: destination,
    waypoints: waypoints,
  }

  if (LoadError) return "Error Loading Maps"
  if (!isLoaded) return "Loading Map"

  const directionsCB = (result, status) => {
    if (status === "OK") {
      setResponse(result)
    }
  }

  const scrollTo = (index) => {
    let offSetLength = window.innerHeight * 0.13
    setCurrentCard(index)
    window.scrollTo({left: 0, top: cardRefs[`cardRef${index}`].current.offsetTop - offSetLength, behavior: 'smooth'})
  }

  if (response === null) {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService()
    directionsService.route(directionsOption, directionsCB)
  }

  return (
    <>
      <div 
        role="button" 
        tabIndex="0" 
        className="google-maps-question" 
        onClick={() => setQuestion(prev => !prev)}
        onKeyDown={() => setQuestion(prev => !prev)}
      >
        {
          (question ? 
            <FontAwesomeIcon className="google-maps-question-icon" icon="times" />
          :
            <FontAwesomeIcon className="google-maps-question-icon" icon="question-circle" />
          )
        }
      </div>

      {
        (question ? 
          <div className="google-maps-question-helper">
            <div>
              Directions wonky? Might be 
              <a target="_blank" rel="noreferrer" href="https://softjourn.com/blog/article/heuristic-programming"> heuristics </a> 
              at play. Give the page a <a href="/day">refresh</a> in order to 
              recalculate a new route. The path generated uses a genetic algorithm
              in order to solve for a traveling salesman problem and so the most optimal
              route might not always be given due to probabilities inherently built into 
              the algorithm.
            </div>
          </div>
        :
          <GoogleMap
            id={"googleMaps"}
            options={options}
          >
            {
              response !== null && (
                <DirectionsRenderer
                  options={{
                    directions: response,
                    suppressMarkers: true
                  }}
                />
              )
            }
            
            {
              response !== null && (
                response.routes[0].legs.map((leg, index) => {
                  return (
                    <Marker
                      key={index}
                      position={leg.start_location}
                      label={(index + 1).toString()}
                      onClick={() => scrollTo(index + 1)}
                      icon={currentCard === index + 1 ? redMarkerObject : yellowMarkerObject}
                      zIndex={currentCard === index + 1 ? 1 : -1}
                    />
                  )
                })
              )
            }
          
            {
              response !== null && (
                <Marker
                  position={response.routes[0].legs[response.routes[0].legs.length-1].end_location}
                  label={(response.routes[0].legs.length + 1).toString()}
                  onClick={() => scrollTo(response.routes[0].legs.length + 1)}
                  icon={currentCard === response.routes[0].legs.length + 1 ? redMarkerObject : yellowMarkerObject}
                  zIndex={currentCard === response.routes[0].legs.length + 1 ? 1 : -1}
                />
              )
            }
          </GoogleMap>
        )
      }

    </>
  )
}

export default DirectionsMap