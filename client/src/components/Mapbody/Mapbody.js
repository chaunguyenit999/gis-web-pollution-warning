import { MapContainer, TileLayer,LayerGroup,Circle, Marker,Popup,LayersControl } from 'react-leaflet';
import {caculateCenterRadius, iconBlack, iconRed, iconYellow} from "./exten.js";
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";
import L from 'leaflet';


function Mapbody() {

  const points = [
    [21.0212, 105.8340],  // point 1
    [21.0232, 105.8334],  // point 3
    [21.0230, 105.8350],  // point 2
    [21.0222, 105.8353],  // point 4
    [21.0228, 105.8344],  // point 5
  ];
  const center = caculateCenterRadius(points)[0]
  const radius = caculateCenterRadius(points)[1]

  let markers = []; // khởi tạo mảng để chứa các marker
  for (let i = 0; i < points.length; i++) {
    const latlng = points[i];
    markers.push(
      <Marker position={latlng} icon={iconRed}>
        <Popup>
        {i}
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="body-content-wrapper">
      <MapContainer center={center} zoom={15} scrollWheelZoom={true} style={{ height: '700px', width: '100%' }}>
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
          <Circle
            center={center}
            color = {'red'}
            radius={radius}
          />
          <Circle
            center={[21.03, 105.84]}
            color = {'yellow'}
            radius={100}
          />
            <Circle
              center={[21.02, 105.82]}
              color = {'green'}
              radius={100}
            />
        </LayerGroup>
      </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
    </div>
  );
}
export default Mapbody;
