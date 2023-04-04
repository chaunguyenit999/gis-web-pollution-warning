import MapNav from 'components/MapNav';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import { useState } from 'react';
import data from 'data.json'
import './Map.scss';

function Map() {
  const [eventuser, setEventuser] = useState('Ha Nam');

  const handleOptionChange = (event) => {
    setEventuser(event.target.value);
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
    let dataMap = filterDataByAddress(data,eventuser)

    return (
        <div className='map-container'>
            <MapNav />
            <div className="body-wrapper">
                <MapSidebar onOptionChange={handleOptionChange}/>
                <Mapbody data = {dataMap}/>
            </div>
        </div>
    );
}

export default Map;
