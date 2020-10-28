import React, { memo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MapStyle from "../../styles/SevilleSpainMap";

const containerStyle = {
  width: '600px',
  height: '700px',
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

const SevilleSpainMap = () => {
  const { isLoaded, LoadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAc8YDdPQeS05YQbUPqdUQS7T2nbaXmSsc"  
  })

  if (LoadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Map"

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
      >

      </GoogleMap>
  )
}

export default memo(SevilleSpainMap)
