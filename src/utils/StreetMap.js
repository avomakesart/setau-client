import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const styles = {
  width: '100%',
  height: '550px',
  position: 'relative',
}

export default function StreetMap() {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)
  const [mapData, setMapData] = useState({
    lat: 20.7506051,
    lng: -103.3971002,
    mapZoom: 15.75,
  })

  const { lat, lng, mapZoom } = mapData

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/alvarocastle/ckd7on8u905t11jmsj74ywce9', // stylesheet location
        center: [lng, lat],
        zoom: mapZoom,
      })

      let popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Security Training and Auditing / Main Office'
      )

      map.on('load', () => {
        setMap(map)
        map.resize()
      })
      map.on('move', () => {
        setMapData({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        })
      })
      new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(map)
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [lat, lng, map, mapZoom])

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />
}
