import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; 
import styles from '../styles/Home.module.css'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CustomExportControl from "./customExportControl";
import { renderToString } from 'react-dom/server';
import InfoPopup from "./infoPopup"

const MapboxDrawComponent = () => {
  const [map, setMap] = useState<Map>();
  const [currentMap, setCurrentMap] = useState({
    lng: -98.35,
    lat: 39.5,
    zoom: 6
  })

  const mapNode = useRef(null);
  const Draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    },
  });
  
  const setDrawControlStyles = () => {
    const polygonControl = document.getElementsByClassName('mapbox-gl-draw_polygon')[0]
    const trashControl = document.getElementsByClassName('mapbox-gl-draw_trash')[0]

    polygonControl.innerHTML = `<i class="fa-solid fa-draw-polygon fa-lg"></i>`
    trashControl.innerHTML = `<i class="fa-solid fa-trash fa-lg"></i>`
  }

  const exportGeojson = (e: SyntheticEvent<any>) => {
    const data = Draw.getAll();
    
    if (data.features.length < 1) { 
      alert(`no drawing found`)  
      return; 
    }

    const geometry = data.features[0].geometry;

    if ((geometry.type == 'Polygon' && geometry.coordinates[0].length < 3) || ( geometry.type != 'Polygon' )) { 
      alert(`boundary shape is invalid`)
      return; 
    }

    fetch(`/api/export-geojson`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
      alert(`saved field boundary to: /out/${data.filename}`)
    })
    .catch((_) => alert(`unable to export field boundary`))
  }
  

useEffect(() => {
  const node = mapNode.current;
  if (typeof window === "undefined" || node === null) return;

  const mapboxMap = new mapboxgl.Map({
    container: node,
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
          style: "mapbox://styles/mapbox/satellite-streets-v12",
    center: [currentMap.lng, currentMap.lat],
    zoom: 6,
  });

  const exportControl = new CustomExportControl({
    title: "Export",
    eventHandler: exportGeojson,
    map: mapboxMap,
  });

  const popup = new mapboxgl.Popup({ maxWidth: 'none' })
    .setLngLat([-98.35, 39.5])
    .setHTML(renderToString(<InfoPopup/>))
    .addTo(mapboxMap);

  mapboxMap.addControl(Draw, "top-left");
  mapboxMap.addControl(exportControl, "bottom-right")
  mapboxMap.on('load', setDrawControlStyles);
  mapboxMap.on('move', (e: SyntheticEvent<any>) => {
    setCurrentMap({
      lng: mapboxMap.getCenter().lng,
      lat: mapboxMap.getCenter().lat,
      zoom: mapboxMap.getZoom(),
    })
  });
  

  mapboxMap.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
  }), "bottom-left");

  mapboxMap.addControl(new mapboxgl.NavigationControl({ 
    visualizePitch: true,
  }), 'bottom-left');

  mapboxMap.addControl(new mapboxgl.FullscreenControl({
    container: document.querySelector('body')
  }), 'top-right');

  setMap(mapboxMap);
      
  return () => {
    mapboxMap.remove();
  };
}, []);

  return (
    <>
      <div className={styles.map} ref={mapNode} style={{ width: "100%", height: "100%" }} />
      <div id="infoFrame">
        <b>Longitude:</b> {currentMap.lng.toFixed(4)} | <b>Latitude:</b> {currentMap.lat.toFixed(4)} | <b>Zoom:</b> {currentMap.zoom.toFixed(2)}
      </div>
    </>
  );
}

export default MapboxDrawComponent