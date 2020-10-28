import React, { useState } from "react"
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript
} from "@react-google-maps/api"
import MapStyle from "../../styles/SevilleSpainMap"
// import latLongData from "../../utils/latitudeLongitude"

const containerStyle = {
  width: "600px",
  height: "700px",
}

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

const DirectionsMap = ({ origin, destination, waypoints }) => {
  const [response, setResponse] = useState(null);
  const { isLoaded, LoadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAc8YDdPQeS05YQbUPqdUQS7T2nbaXmSsc",
    libraries: libraries,
  })

  const [directionsOptions, setDirectionsOptions] = useState({
    travelMode: 'WALKING',
    origin: origin,
    destination: destination,
    waypoints: waypoints,
  })

  if (LoadError) return "Error Loading Maps"
  if (!isLoaded) return "Loading Map"

  const directionsCB = (response) => {
    console.log(response)

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response)
      } else {
        console.log("response: ", response)
      }
    }
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={options}
    >
      {
        (
          directionsOptions.origin !== '' &&
          directionsOptions.destination !== ''
        ) && (
          <DirectionsService
            options={directionsOptions}
            callback={directionsCB}
          />
        )
      }

      {
        response !== null && (
          <DirectionsRenderer
            options={{
              directions: response
            }}
          />
        )
      }
    </GoogleMap>
  )
}

export default DirectionsMap