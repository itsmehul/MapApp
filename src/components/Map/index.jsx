import React, { useState } from "react"
import { Map, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { EditControl } from "react-leaflet-draw"
import { points, polygon, pointsWithinPolygon } from "@turf/turf"
import { useSelector } from "react-redux"

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
})

let ogData = [
  [51.5, -0.09],
  [51.495, -0.083],
  [51.49, -0.1],
]

export default (props) => {
  const [markedLocations, setMarkedLocations] = useState(ogData)

  const {regions,selected} = useSelector((state) => state.regions)


  const onEdited = (e) => {
    let numEdited = 0
    e.layers.eachLayer((layer) => {
      numEdited += 1
    })
    console.log(`onEdited: edited ${numEdited} layers`, e)

    onChange()
  }

  const editableFG = null

  const onChange = () => {
    // editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = props

    if (!editableFG || !onChange) {
      return
    }

    const geojsonData = editableFG.leafletElement.toGeoJSON()
    onChange(geojsonData)
  }

  const onCreated = (e) => {
    let type = e.layerType
    let layer = e.layer
    if (type === "marker") {
      // Do marker specific actions
      console.log("onCreated: marker created", e)
    } else {
      console.log("onCreated: something else created:", type, e)
      if (type === "polygon") {
        var pts = points(markedLocations)
        let polypts = e.layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng])
        const firstPnt = polypts[0]
        const lastPnt = polypts[polypts.length - 1]
        const midLat = (firstPnt[0] + lastPnt[0]) / 2
        const midLng = (firstPnt[1] + lastPnt[1]) / 2
        const intersectingPolyPnt = [midLat, midLng]
        polypts[0] = intersectingPolyPnt
        polypts[polypts.length - 1] = intersectingPolyPnt
        var searchWithin = polygon([polypts])
        var { features } = pointsWithinPolygon(pts, searchWithin)
        const ptsWithin = features.map((ft) => ft.geometry.coordinates)
        setMarkedLocations(ptsWithin)
      }
    }
    // Do whatever else you need to. (save to db; etc)

    onChange()
  }

  const onDeleted = (e) => {
    let numDeleted = 0
    e.layers.eachLayer((layer) => {
      numDeleted += 1
    })
    console.log(`onDeleted: removed ${numDeleted} layers`, e)
    onChange()
  }

  const onMounted = (drawControl) => {
    console.log("onMounted", drawControl)
  }

  const onEditStart = (e) => {
    console.log("onEditStart", e)
  }

  const onEditStop = (e) => {
    console.log("onEditStop", e)
  }

  const onDeleteStart = (e) => {
    console.log("onDeleteStart", e)
  }

  const onDeleteStop = (e) => {
    setMarkedLocations(ogData)
    console.log("onDeleteStop", e)
  }

  return (
    <Map center={regions[selected].latlng} zoom={5} zoomControl={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        {markedLocations.map((point) => (
          <Marker position={point}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <EditControl
          position="bottomleft"
          onEdited={onEdited}
          onCreated={onCreated}
          onDeleted={onDeleted}
          onMounted={onMounted}
          onEditStart={onEditStart}
          onEditStop={onEditStop}
          onDeleteStart={onDeleteStart}
          onDeleteStop={onDeleteStop}
          draw={{
            rectangle: false,
          }}
        />
      </FeatureGroup>
    </Map>
  )
}
