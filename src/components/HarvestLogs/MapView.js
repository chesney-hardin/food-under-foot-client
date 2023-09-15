/* import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import '/Users/chesneyhardin/workspace/food-under-foot/food-under-foot-client/src/index.css' 


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlc25leS1oYXJkaW4iLCJhIjoiY2xtamd5bWl4MDM5MjJpcGdwZ2FjbGZsYSJ9.5afo7v2axzWZ8ejl1fiXcg'

export const MapView = ({ harvestLogs }) => {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(-86.777705)
    const [lat, setLat] = useState(36.174334)
    const [zoom, setZoom] = useState(6)


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    useEffect(() => {
        if (!map.current) return; // Don't proceed if the map is not initialized yet
    
     // Clear existing markers
        const markers = document.querySelectorAll('.mapboxgl-marker')
        markers.forEach((marker) => marker.remove()) 
    
        // Add map markers for each point in the mapPoints array
        harvestLogs.forEach((log) => {
          new mapboxgl.Marker({ anchor: 'bottom'})
            .setLngLat([log.longitude, log.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(
                `<div>${log.title}</div>
                <div>${formatDate(log.date)}</div>
                <div>${log.wild_plant.common_name} ${log.plant_part.label} harvest</div>`))
            .addTo(map.current)
        })
      }, [harvestLogs])



    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [lng, lat],
            zoom: zoom
        })


        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4))
            setLat(map.current.getCenter().lat.toFixed(4))
            setZoom(map.current.getZoom().toFixed(2))
        })

    }, [])

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>

            <div ref={mapContainer} className="map-container" />
        </div>
    )
}
 */

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '/Users/chesneyhardin/workspace/food-under-foot/food-under-foot-client/src/index.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlc25leS1oYXJkaW4iLCJhIjoiY2xtamd5bWl4MDM5MjJpcGdwZ2FjbGZsYSJ9.5afo7v2axzWZ8ejl1fiXcg';

export const MapView = ({ harvestLogs }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-86.777705);
  const [lat, setLat] = useState(36.174334);
  const [zoom, setZoom] = useState(6);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if (!map.current) return; // Don't proceed if the map is not initialized yet

    // Add map markers for each point in the mapPoints array
    harvestLogs.forEach((log) => {
      new mapboxgl.Marker({ anchor: 'bottom' })
        .setLngLat([log.longitude, log.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div>${log.title}</div>
             <div>${formatDate(log.date)}</div>
             <div>${log.wild_plant.common_name} ${log.plant_part.label} harvest</div>`
          )
        )
        .addTo(map.current);
    });
  }, [harvestLogs]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h1 className="text-2xl font-semibold mb-2">Map View</h1>
          <div className="text-sm">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>

        <div
          ref={mapContainer}
          className="map-container h-96 rounded-lg shadow-md overflow-hidden"
        />
      </div>
    </div>
  );
};


