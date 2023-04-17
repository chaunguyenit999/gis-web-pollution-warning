import { MapContainer, TileLayer, LayerGroup, Circle, Marker, Popup, LayersControl } from 'react-leaflet';
import { caculateCenterRadius, iconBlack, iconRed, iconYellow } from "./exten.js";
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";


function Mapbody(props) {
  const points = props.data
  const center = caculateCenterRadius(points)[0]

  let markers = [];
  let circle = [];

  for (let i = 0; i < points.length; i++) {
    const latlng = points[i];
    markers.push(
      <Marker position={latlng} icon={iconRed}>
        <Popup>
          {/* {data[i][0]} */}
          {i}
        </Popup>
      </Marker>
    );

    circle.push(
    <Circle
      center={latlng}
      color={'red'}
      radius={400}
    />);
  }

  return (
    <div className="body-content-wrapper">
      <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ height: '700px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name ="Marker">
            <LayerGroup>
              {markers}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name ="Circles">
            <LayerGroup>
            {circle}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <LayersControl position="bottomright">
          <LayersControl.Overlay checked name ="Marker">
            <LayerGroup>
              {markers}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name ="Circles">
            <LayerGroup>
            {circle}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
export default Mapbody;
