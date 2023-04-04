import { MapContainer, TileLayer, LayerGroup, Circle, Marker, Popup, LayersControl } from 'react-leaflet';
import { caculateCenterRadius, filterDataByAddress, iconBlack, iconRed, iconYellow } from "./exten.js";
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";
import data from 'data.json'


function Mapbody() {
  const points = filterDataByAddress(data)
  const center = caculateCenterRadius(points)[0]

  let markers = [];// khởi tạo mảng để chứa các marker
  let circle = []
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name checked="Marker with popup">
            <LayerGroup>
              {markers}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name checked="Layer group with circles">
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
