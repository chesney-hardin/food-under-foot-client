import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlc25leS1oYXJkaW4iLCJhIjoiY2xtamd5bWl4MDM5MjJpcGdwZ2FjbGZsYSJ9.5afo7v2axzWZ8ejl1fiXcg'

export const SelectCoordinatesMap = ({ setNewHarvestLog, newHarvestLog }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-86.777705)
  const [lat, setLat] = useState(36.174334)
  const [zoom, setZoom] = useState(6)
  const [clickedLngLat, setClickedLngLat] = useState(null)

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })

    // Define a variable to store the custom pin marker
    let marker = null

    // Add a click event handler for the map
    map.current.on('click', (e) => {
      // Remove the previous marker, if any
      if (marker) {
        marker.remove()
      }

      // Create a new marker at the clicked location
      marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(e.lngLat)
        .addTo(map.current)

      // Update the clicked coordinates
      setClickedLngLat(e.lngLat)

      // Capture the coordinates when the marker is dragged
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setClickedLngLat(lngLat)
      })
    })
  }, [])

  const handleSaveCoordinates = () => {
    if (clickedLngLat) {
      // Save the coordinates to the new harvest log here.
      const copy = { ...newHarvestLog }
      copy.latitude = clickedLngLat.lat
      copy.longitude = clickedLngLat.lng
      setNewHarvestLog(copy)
    }
  }

  return (
    <div className="bg-gray-100 p-1">
      <div className="p-2">
      <div
          ref={mapContainer}
          className="map-container h-96 rounded-lg shadow-md overflow-hidden"
          style={{ cursor: 'pointer' }}
        />
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="text-l mb-2">Drop a pin for your harvest location and click "save coordinates".</div>
          <div className="text-sm">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <button
            onClick={handleSaveCoordinates}
            className="btn mt-2"
          >
            Save Coordinates
          </button>
        </div>

        
      </div>
    </div>
  )
}
