import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRef, useEffect,useState  } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";
import Legend from "./Legend";
import { Modal, Button } from "react-bootstrap";


function Mapbody(props) {
  // trả về obj bao gồm tên các giá trị ô nhiễm, state, value. mainPollutant là giá trị ô nhiễm chính
  function typeOfPollution(objectType, inputData) {
    const keys = Object.keys(objectType)
    let mainPollutant = ""
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      objectType[element].value = inputData[element].result
    }
      for (let index = 0; index < Object.keys(objectType).length; index++) {
        const element = Object.keys(objectType)[index];
        if (objectType[element].state === "1") {
          if (mainPollutant === "") {
            mainPollutant = element
          }
          else{
            if (objectType[mainPollutant].value<objectType[element].value) {
              mainPollutant = element
            }
          }
        }
      }
    return [objectType,mainPollutant]
    }

  // trả về obj icon của leaflet
  function classPoint(inputData = "default", typeOfPollution) {
    if (inputData === "default") {
      return [L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      }),'']
    }
    else {
      const maxValue = typeOfPollution[0][typeOfPollution[1]].value
      if (maxValue === 1) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }),'green']
      }
      else if (maxValue === 2) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28]
        }),'yellow']
      }
      else if (maxValue === 3) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }),'orange']
      }
      else if (maxValue === 4) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }),'grey']
      }
      else if (maxValue === 5) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }),'red']
      }
      else if (maxValue === 6) {
        return [L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }),'violet']
      }
    }

  }

  // xác định vị trí ng dùng
  // function LocationMarker() {
  //   const [position, setPosition] = useState(null)
  //   const map = useMapEvents({
  //     // overlayadd(){
  //     //   console.log()
  //     // },
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng)
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //   })

  //   return position === null ? null : (
  //     <Marker position={position} icon={classPoint()}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   )
  // }

  // tạo marker
  function marker(points, listOfYears) {
    let markers = Object.assign({}, ...listOfYears.map(key => ({ [key]: [] })));
    for (let i = 0; i < points.length; i++) {

      const mainPollutant = typeOfPollution(props.typeOfPollutions, points[i])
      const color = classPoint(points[i], mainPollutant)

      markers[points[i].date.year].push(
        <Marker id = {i} position={[points[i].location.latitude, points[i].location.longitude]} icon={color[0]}
        eventHandlers={{
          click: (e) => {
            handleMarkerClick(e)
          },
        }}>
        </Marker>
      );
    }
    return markers

  };

  // handle modal
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const handleClose = () => setShow(false);
  function handleMarkerClick(event) {
    const mainPollutant = typeOfPollution(props.typeOfPollutions, props.data[event.target.options.id])
    const color = classPoint(props.data[event.target.options.id], mainPollutant)
    let keys = Object.keys(props.data[event.target.options.id]);
    setShow(true)
    setModalHeader(`${props.data[event.target.options.id].location.address}`)
    setModalBody(
    <div dangerouslySetInnerHTML={{
      __html: (() => {
        let result = `<table><tr><td>${keys[2]}: ${props.data[event.target.options.id][keys[2]].iso.slice(0, 10)}</td></tr>`;

        for (let index = 3; index < keys.length; index++) {
          if (keys[index] === mainPollutant[1]){
          result += `<tr><td><b>${keys[index]}: ${props.data[event.target.options.id][keys[index]].aqi}</b></td></tr>`;
          }
          else{
          result += `<tr><td>${keys[index]}: ${props.data[event.target.options.id][keys[index]].aqi}</td></tr>`;
          }
        }
        if (color[1]!== "green") {
          result += `<tr><td>chất gây ô nhiễm chính: <b>${mainPollutant[1]}</b></td></tr>`
        }
        return result;
      })()
    }} />);
  }
  // end handle modal

  // handle select tỉnh thành
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
  // end handle select tỉnh thành

  const markers = marker(props.data, props.listOfYear)
  const markersDisplay = markers[props.selectedYear]
  return (
    <div className="body-content-wrapper">
      <MapContainer ref={mapRef} center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersDisplay}
        {/* <LocationMarker /> */}
        <Legend />
      </MapContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </div>
  );
}
export default (Mapbody);
