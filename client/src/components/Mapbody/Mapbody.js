import { MapContainer, TileLayer, LayerGroup, Circle, Marker, GeoJSON, Popup, LayersControl } from 'react-leaflet';
import { caculateCenterRadius, iconBlack, iconRed, iconYellow } from "./exten.js";
import { useRef, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";


function Mapbody(props) {
  let mapContent;

  let center = props.center

  const mapRef = useRef(null);
  const handleClick = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, 11, {
        duration: 1,
        easeLinearity: 0.5,
      });
    }
  };

  useEffect(() => {
    handleClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.center]);


  if (props.type === "air") {
    const points = props.data
    let markers = [];
    let circle = [];
    let latlng = [];
    for (let i = 0; i < points.length; i++) {
      markers.push(
        <Marker position={[points[i].location.latitude, points[i].location.longitude]} icon={iconRed}>
          <Popup>
            {(() => {
              for (let i = 0; i < points.length; i++) {
              }
            })}
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
          center={[points[i].location.latitude, points[i].location.longitude]}
          color={'red'}
          radius={400}
        />);

      latlng.push([points[i].location.latitude, points[i].location.longitude])
    }
    center = caculateCenterRadius(latlng)[0]

    mapContent = (
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Marker">
          <LayerGroup>
            {markers}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Circles">
          <LayerGroup>
            {circle}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    )
  }

  else if (props.type === "earth") {
    const multiPolygonStyle = {
      fillColor: 'red', // màu tô đậm MultiPolygon
      fillOpacity: 0.3, // độ trong suốt của tô đậm
      weight: 1, // độ rộng của đường viền
      color: '#000000' // màu của đường viền
    }
    mapContent = (
      <GeoJSON data={props.data} fillColor={'green'} color={'#000000'} weight={0.5} style={(feature) => feature.properties.NAME_3 === 'AnĐổ' ? multiPolygonStyle : null} />
    )
  }

  else if (props.type === "water") {
    mapContent = (
      <div>
        <GeoJSON data={props.data[0]} color={'#11D51E'} />
        <GeoJSON data={props.data[1]} color={'#1117D5'} />
      </div>
    )
  }
  return (
    <div className="body-content-wrapper">
      <MapContainer ref={mapRef} center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapContent}
      </MapContainer>
    </div>
  );
}
export default Mapbody;
