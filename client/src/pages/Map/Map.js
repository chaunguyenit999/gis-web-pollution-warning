import MapNav from 'components/MapNav';
import { pointInLayer } from 'leaflet-pip';
import L from "leaflet";
import { Spinner } from 'react-bootstrap';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import { useState } from 'react';
import './Map.scss';
import administrativeAreas from '../../data/gadm41_VNM_1.json';
import earthData from '../../data/gadm41_VNM_4.json';
import waterData2 from '../../data/2a.json';
import waterData1 from '../../data/1a.json';



function Map(props) {
    let api = props.data

    const [eventUserAddresss, setEventUserAddress] = useState('HaNam');
    const [eventUserType, setEventUserType] = useState('airs');
    const [centerLatLng, setcenterLatLng] = useState([20.583520, 105.922990]);
    const handleOptionChange = (event) => {
        setEventUserAddress(event.target.value);
        setcenterLatLng([event.target.options[event.target.selectedIndex].dataset.lat, event.target.options[event.target.selectedIndex].dataset.lng]);
    };

    const handleOptionClick = (type) => {
        setEventUserType(type)
        props.callApi(type)

    };
    if (Object.keys(api).length === 0) {
        props.callApi(eventUserType)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <span className="sr-only">Loading...</span>
                <Spinner animation="border" role="status">
                </Spinner>
            </div>
        );
    }

    // Khởi tạo layer cho Hà Nam
let HANAM = administrativeAreas.features.filter((element) => element.properties.VARNAME_1 === 'HaNam');
let HANAM1 = HANAM[0].geometry.coordinates[0];
let hanamLayer = L.geoJSON(HANAM1);

// Khởi tạo điểm cần kiểm tra
let pointToCheck = [20.583520, 105.922990];

console.log(hanamLayer);

    var dataMap;
    var baseMap;

    function filterDataByAddress(baseMap, dataInput, addressInput) {
        let conscious;
        const points = [];
        for (let index = 0; index < baseMap.features.length; index++) {
            const element = baseMap.features[index];

            if (element.properties.VARNAME_1 === addressInput) {
                conscious = element.geometry.coordinates[0]
            }
        }

        for (let index = 0; index < dataInput.length; index++) {
            const element = dataInput[index];
            if (pointInLayer([element.location.latitude, element.location.longitude], L.layerGroup(conscious))) {
                points.push(element);
            }
        }
        return points
    }
    if (eventUserType === 'airs') {
        dataMap = filterDataByAddress(administrativeAreas, api, eventUserAddresss)
    }
    else if (eventUserType === 'earths') {
        baseMap = earthData
    }
    else if (eventUserType === 'waters') {
        baseMap = [waterData1, waterData2]
    }

    if (Object.keys(api).length !== 0) {
        return (
            <div className='map-container'>
                <MapNav />
                <div className="body-wrapper">
                    <MapSidebar onOptionChange={handleOptionChange} onOptionClick={handleOptionClick} />
                    <Mapbody geojson={baseMap} data={dataMap} center={centerLatLng} type={eventUserType} />
                </div>
            </div>
        );
    }
}

export default Map;
