import { MapContainer, TileLayer,LayerGroup,Circle, Marker,Popup } from 'react-leaflet';
import IconImg from "./../../assets/images/point.png";
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";
import L from 'leaflet';


function Mapbody() {
  const center = [21.0278, 105.8342]
  const position = [21.0278, 105.8342]
  const icon = L.icon({
    iconUrl: IconImg,
    iconSize: [30,30],
  })

  const fillBlueOptions = { fillColor: 'blue' }
  const fillRedOptions = { fillColor: 'red' }
  const greenOptions = { color: 'green', fillColor: 'green' }
  const purpleOptions = { color: 'purple' }
  return (
    <div className="body-content-wrapper">
      <MapContainer center={center} zoom={15} scrollWheelZoom={true} style={{ height: '700px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LayerGroup>
        <Circle
          center={center}
          pathOptions={fillBlueOptions}
          radius={200}
        />
        <Circle
          center={[21.03, 105.84]}
          pathOptions={fillRedOptions}
          radius={100}
          stroke={false}
        />
        <LayerGroup>
          <Circle
            center={[21.02, 105.82]}
            pathOptions={greenOptions}
            radius={100}
          />
        </LayerGroup>
      </LayerGroup>
    </MapContainer>
    </div>
  );
}
export default Mapbody;
