import React from "react";

const InfoPopup = () => {

  return (
    <div className="infoPopup">
      <h1>Instructions</h1>
      <hr/>
      <p>Draw and delete field boundaries polygons using the controls located at the top left of the map.</p>
      <p>Save drawn field boundaries using the export button located at the bottom-right of the map.</p>
      <p>Field Boundaries will be exported to the <strong>/out</strong> directory.</p>
      <p>Click anywhere on the map to dismiss this message.</p>
    </div>
  )
}

export default InfoPopup