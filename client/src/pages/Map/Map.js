import MapNav from 'components/MapNav';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import { useState } from 'react';
import './Map.scss';
import airData from '../../data/point_air.json';
import earthData from '../../data/gadm41_VNM_4.json';
import waterData2 from '../../data/2a.json';
import waterData1 from '../../data/1a.json';

function Map() {
  const [eventUserAddresss, setEventUserAddress] = useState('Ha Nam');
  const [centerLatLng, setcenterLatLng] = useState([21.028511,105.804817]);

  const handleOptionChange = (event) => {
    setEventUserAddress(event.target.value);
    setcenterLatLng([event.target.options[event.target.selectedIndex].dataset.lat,event.target.options[event.target.selectedIndex].dataset.lng]);
  };
  const [eventUserType, setEventUserType] = useState('air');

  const handleOptionClick = (type) => {
    setEventUserType(type)
  };
  var dataMap;
    if (eventUserType === 'air') {
        // function filter data by address
        function filterDataByAddress(dataInput, addressInput) {
            const points = [];
            for (let index = 0; index < dataInput.length; index++) {
            const element = dataInput[index];
            if (element.location.address === addressInput) {
                points.push(element);
                // points.push(element);
            }
            }
            return points
        }
        dataMap = filterDataByAddress(airData,eventUserAddresss)
    }
    else if (eventUserType === 'earth') {
        dataMap = earthData
    }
    else if (eventUserType === 'water') {
        dataMap = [waterData1, waterData2]
    }
    // function filter data by type of polution data
    // function filterDataByType(dataInput, addressInput) {
    //     earthData
    // }
        return (
            <div className='map-container'>
                <MapNav />
                <div className="body-wrapper">
                    <MapSidebar onOptionChange={handleOptionChange} onOptionClick={handleOptionClick}/>
                    <Mapbody data = {dataMap} center = {centerLatLng} type = {eventUserType} />
                </div>
            </div>
        );
}

export default Map;
