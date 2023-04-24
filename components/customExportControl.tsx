import { SyntheticEvent } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { renderToString } from 'react-dom/server';
import Image from 'next/image';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'





class CustomExportControl {
  _title: string;
  _btn: any;
  _container: any;
  _map: Map | undefined;
  _eventHandler:(e: SyntheticEvent<any>) => void;
  constructor({
    title = "",
    eventHandler = (e: SyntheticEvent<any>) => {},
    map = new mapboxgl.Map,
  }) {
    this._title = title;
    this._eventHandler = eventHandler;
    this._map = map;
  }

  onAdd(_map: Map) {
    this._btn = document.createElement("button");
    this._btn.className = "exportBtn"
    this._btn.type = "button";
    this._btn.title = this._title;
    this._btn.onclick = this._eventHandler;
    this._btn.innerHTML = `<i class="fa-solid fa-download fa-lg"></i> Export`

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export default CustomExportControl