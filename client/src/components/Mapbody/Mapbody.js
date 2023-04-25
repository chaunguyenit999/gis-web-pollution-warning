import { MapContainer, TileLayer, LayerGroup, Circle, Marker, GeoJSON, Popup, LayersControl } from 'react-leaflet';
import { caculateCenterRadius, iconBlack, iconRed, iconYellow } from "./exten.js";
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";


function Mapbody(props) {
  if (props.type === "air") {
    const points = props.data
    let markers = [];
    let circle = [];
    let latlng = [];
    for (let i = 0; i < points.length; i++) {
      markers.push(
        <Marker position={[points[i].location.latitude,points[i].location.longitude]} icon={iconRed}>
          <Popup>
            {`"wind_degree:" ${props.data[i].wind_degree}`}<br />
            {`"humidity:" ${props.data[i].humidity}`}<br />
            {`"wind_speed:" ${props.data[i].wind_speed}`}<br />
            {`"wind_direction:" ${props.data[i].wind_direction}`}<br />
            {`"pressure:" ${props.data[i].pressure}`}<br />
            {`"wind_dust:" ${props.data[i].wind_dust}`}<br />
            {`"sulfur_dioxide:" ${props.data[i].sulfur_dioxide}`}<br />
            {`"carbon_monoxide:" ${props.data[i].carbon_monoxide}`}<br />
            {`"nito_dioxit:" ${props.data[i].nito_dioxit}`}<br />
            {`"equivalent_noise:" ${props.data[i].equivalent_noise}`}<br />
            {`"extreme_noise:" ${props.data[i].extreme_noise}`}<br />
          </Popup>
        </Marker>
      );

      circle.push(
      <Circle
        center={[points[i].location.latitude,points[i].location.longitude]}
        color={'red'}
        radius={400}
      />);

      latlng.push([points[i].location.latitude,points[i].location.longitude])
    }
    const center = caculateCenterRadius(latlng)[0]

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
        </MapContainer>
      </div>
    );
  }
  else if (props.type === "earth") {
    const multiPolygonStyle = {
      fillColor: 'red', // màu tô đậm MultiPolygon
      fillOpacity: 0.3, // độ trong suốt của tô đậm
      weight: 1, // độ rộng của đường viền
      color: '#000000' // màu của đường viền
    }
    return (
      <div className="body-content-wrapper">
        <MapContainer center={[21.028511,105.804817]} zoom={12} scrollWheelZoom={true} style={{ height: '700px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <GeoJSON data={props.data} fillColor = {'green'} color = {'#000000'} weight = {0.5} style={(feature) => feature.properties.NAME_3 === 'AnĐổ' ? multiPolygonStyle : null}/>
        </MapContainer>
    </div>
    );
  }
  else if (props.type === "water") {
    return (
      <div className="body-content-wrapper">
        <MapContainer center={[21.028511,105.804817]} zoom={12} scrollWheelZoom={true} style={{ height: '700px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <GeoJSON data={props.data[1]} color = {'#11D51E'}/>
        <GeoJSON data={props.data[0]} color = {'#1117D5'}/>
        </MapContainer>
    </div>
    );
  }
}
export default Mapbody;
