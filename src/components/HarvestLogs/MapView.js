import React, { useEffect, useRef, useState } from 'react'
// import mapbox-gl library for map integration
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlc25leS1oYXJkaW4iLCJhIjoiY2xtamd5bWl4MDM5MjJpcGdwZ2FjbGZsYSJ9.5afo7v2axzWZ8ejl1fiXcg'

// harvestLogs is a prop from UserHarvestLogs and PublicHarvestLogs modules
export const MapView = ({ harvestLogs }) => {
  // mapContainer references the HTML container element for the map
  const mapContainer = useRef(null)
  // map references the Mapbox map instance
  const map = useRef(null)
  // set initial lat and long view to Nashville's coordinates with a wide zoom
  const [lng, setLng] = useState(-86.777705)
  const [lat, setLat] = useState(36.174334)
  const [zoom, setZoom] = useState(6)

  // using Javascript's Date object to convert the date 
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // renders markers on the map whenever harvestLogs array changes
  useEffect(() => {
    // if map is not initialized return early
    if (!map.current) return

    harvestLogs.map((log) => {
      const marker = new mapboxgl.Marker({ anchor: 'bottom' })
        .setLngLat([log.longitude, log.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div>${log.title}</div>
            <div>${formatDate(log.date)}</div>
            <div>${log.wild_plant.common_name} ${log.plant_part.label} harvest</div>
            <img style={{ maxHeight: '10px' }} src=${log.image} />`
          )
        )
        marker.addTo(map.current)
        return marker
    })
  }, [harvestLogs])

  // initializes the map on initial rendering of the component
  useEffect(() => {
    // if map is already initialized return early
    if (map.current) return 
    // create a mapbox instance with initial conditions
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })
    // event listener that updates the lat and long state when user moves on the map
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [])

  return (
    <div className="bg-gray-100 p-1">
      <div className="p-2">
        <div
          ref={mapContainer}
          className="map-container h-96 rounded-lg shadow-md overflow-hidden"
        />
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="text-sm">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>


      </div>
    </div>
  )
}


