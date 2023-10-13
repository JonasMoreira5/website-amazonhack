import React, { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Polygon, Popup, TileLayer, PolygonProps, useMapEvents } from 'react-leaflet'
import { Icon, LatLngExpression, LatLng } from 'leaflet'
import { Typography } from '@material-tailwind/react'
import RatingPopup from '../RatingPopup'

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker
      position={position}
      icon={new Icon({ iconUrl: '/your-location.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
    >
      <Popup className='mt-[-10px]'>Você está aqui</Popup>
    </Marker>
  )
}

const amazonasCoordinates: LatLngExpression[] = [
  [-2.02, -56.14],
  [1.69, -69.76],
  [-7.13, -73.72],
  [-9.25, -65.3],
  [-8.67, -58.62]
]

const greenColor = { color: 'green' }

const Map = () => {
  return (
    <section className='flex justify-center flex-col'>
      <MapContainer
        className='h-[400px] w-[80%] mx-auto'
        center={[-3.10, -60]} zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[-3.10, -60]}
          icon={new Icon({ iconUrl: '/tower.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
          <Popup>
            <Typography variant="small">
              Status: <Typography as={'span'} color='green' variant='small' className='font-bold'>Ativo</Typography>
            </Typography>
          </Popup>
          <Polygon pathOptions={greenColor} positions={amazonasCoordinates} />
        </Marker>
        <LocationMarker />
      </MapContainer>
    </section>
  )
}

export default Map