import MapNav from 'components/MapNav';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import { useState } from 'react';
import './Map.scss';
import airData from '../../data/point_air.json';
import earthData from '../../data/4.json';

function Map() {
  const [eventuserchoice, setEventuser1] = useState('Ha Nam');

  const handleOptionChange = (event) => {
    setEventuser1(event.target.value);
  };
  const [eventuserclick, setEventuser2] = useState('air');

  const handleOptionClick = (event) => {
    setEventuser2(event);
  };

    // function filter data by address
    function filterDataByAddress(dataInput, addressInput) {
        const points = [];
        for (let index = 0; index < dataInput.length; index++) {
        const element = dataInput[index];
        if (element.location.address === addressInput) {
            points.push([element.location.latitude, element.location.longitude]);
        }
        }
        return points
    }
    let dataMap = filterDataByAddress(airData,eventuserchoice)

    // function filter data by type of polution data
    // function filterDataByType(dataInput, addressInput) {
    //     earthData
    // }
        return (
            <div className='map-container'>
                <MapNav />
                <div className="body-wrapper">
                    <MapSidebar onOptionChange={handleOptionChange} onOptionClick={handleOptionClick} />
                    <Mapbody data = {dataMap} type = {eventuserclick}/>
                </div>
            </div>
        );
}

export default Map;
