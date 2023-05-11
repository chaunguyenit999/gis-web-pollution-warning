import { MapContainer, TileLayer, LayerGroup, Circle, Marker, GeoJSON, Popup, LayersControl } from 'react-leaflet';
import { useRef, useEffect } from 'react';
import L from 'leaflet';
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


  if (props.type === "airs") {
    const points = props.data
    let markers = [];
    let circle = [];
    let latlng = [];

    function classPoint(pollutionLevel) {
      if (pollutionLevel === 1) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), "green"];
      }
      else if (pollutionLevel === 2) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28]
        }), "yellow"];
      }
      else if (pollutionLevel === 3) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), "orange"];
      }
      else if (pollutionLevel === 4) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), "red"];
      }
    }

    for (let i = 0; i < points.length; i++) {
      const color = classPoint(points[i].result)
      markers.push(
        <Marker position={[points[i].location.latitude, points[i].location.longitude]} icon={color[0]}>
          <Popup>
            <div dangerouslySetInnerHTML={{
              __html: (() => {
                let keys = Object.keys(points[i]);
                let result = '<table><tr><th style = "border-bottom: 3px solid black">  ';
                result += `${points[i].location.address}</th></tr>`
                for (let index = 3; index < keys.length - 2; index++) {
                  result += `<tr><td>${keys[index]}: ${points[i][keys[index]]}</td></tr>`;
                }
                result += '</tr>'
                return result;
              })()
            }} />
          </Popup>
        </Marker>
      );

      circle.push(
        <Circle
          center={[points[i].location.latitude, points[i].location.longitude]}
          color={color[1]}
          radius={1700}
        />);

      latlng.push([points[i].location.latitude, points[i].location.longitude])
    }

    mapContent = (
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Marker">
          <LayerGroup>
            {markers}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Circles">
          <LayerGroup>
            {circle}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    )
  }

  else if (props.type === "earths") {
    const multiPolygonStyle = {
      fillColor: 'red', // màu tô đậm MultiPolygon
      fillOpacity: 0.3, // độ trong suốt của tô đậm
      weight: 1, // độ rộng của đường viền
      color: '#000000' // màu của đường viền
    }
    mapContent = (
      <GeoJSON data={props.geojson} fillColor={'green'} color={'#000000'} weight={0.5} style={(feature) => feature.properties.NAME_3 === 'AnĐổ' ? multiPolygonStyle : null} />
    )
  }

  else if (props.type === "waters") {
    mapContent = (
      <div>
        <GeoJSON data={props.geojson[0]} color={'#11D51E'} />
        <GeoJSON data={props.geojson[1]} color={'#1117D5'} />
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
