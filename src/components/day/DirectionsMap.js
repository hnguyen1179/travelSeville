import React, { useEffect, useState } from "react"
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
  Marker
} from "@react-google-maps/api"
import MapStyle from "../../styles/SevilleSpainMap"

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import yellowMarker from "./yellow-circle.png"
import redMarker from "./red-circle.png"

const center = {
  lat: 37.389091,
  lng: -5.984459,
}

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
  const { isLoaded, LoadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAc8YDdPQeS05YQbUPqdUQS7T2nbaXmSsc",
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

  const directionsCB = (output) => {
    // This prevents rerenderings from setResponse thereby creating an over_query_limit error
    // This is an infinite loop... Rerender from setResponse => callback is called => directionsCB => setResponse
    if (response !== null) {
      return
    }

    if (output !== null) {
      if (output.status === "OK") {
        setResponse(output)
      } else {
        console.log("response: ", output)
      }
    }
  }

  // Placeholder for 
  const labelClick = (index) => {
    console.log(`current card is now ${index}`)
    setCurrentCard(index)
  }

  const scrollTo = (index) => {
    setCurrentCard(index)
    window.scrollTo({left: 0, top: cardRefs[`cardRef${index}`].current.offsetTop - 100, behavior: 'smooth'})
  }

  return (
    <GoogleMap
      id={"googleMaps"}
      options={options}
    >
      {
          <DirectionsService
            options={directionsOption}
            callback={directionsCB}
          />
      }

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

export default DirectionsMap