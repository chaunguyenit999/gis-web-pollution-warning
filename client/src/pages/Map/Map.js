import MapNav from 'components/MapNav';
import { Spinner } from 'react-bootstrap';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import { useState } from 'react';
import './Map.scss';


function Map(props) {
    let api = props.data
    // get unique conscious and year
    let conscious = {};
    let year = []
    let typeOfPollution = []
    for (let index = 0; index < api.length; index++) {
        const element = api[index];
        const lat = element.location.latitude
        const lng = element.location.longitude
        const arr = element.location.state.split(" ");
        arr.shift()
        const result = arr.join(' ');
        if (!(result in conscious)) {
            conscious[result] = { latitude: lat, longitude: lng };
        }
        if (!(year.includes(element.date.year))) {
            year.push(element.date.year)
        }
        for (let index = 3; index < Object.keys(element).length; index++) {
            const chillElement = Object.keys(element)[index];
            if (!(typeOfPollution.includes(chillElement))) {
                typeOfPollution.push(chillElement)
            }
        }
    }
    const typeOfPollutions = {}
    for (let index = 0; index < typeOfPollution.length; index++) {
        const element = typeOfPollution[index];
        typeOfPollutions[element] = {state:'1'}
    }

    const [pollutionState, setPollutionState] = useState(typeOfPollutions);
    const [selectedYear, setSelectedLayer] = useState('');
    const [eventUserAddresss, setEventUserAddress] = useState('Tỉnh Hà Nam');
    const [centerLatLng, setcenterLatLng] = useState([20.583520, 105.922990]);

    const handleTypeChange = (event) => {
        const newState = {...pollutionState, [event.target.id]: {state:event.target.value === '1' ? '0' : '1'}};
        const list = ['0', '0', '0']
        if (!Object.values(newState).map(item => item.state).every((val, i) => val === list[i])) {
            setPollutionState(newState);
        }
        else{
            alert("chọn ít nhất 1 giá trị cho kiểu dữ liệu ")
        }
    }
    const handleOptionChange = (event, type) => {
        if (type === "tỉnh") {
            setEventUserAddress("Tỉnh " + event.target.value);
            setcenterLatLng([event.target.options[event.target.selectedIndex].dataset.lat, event.target.options[event.target.selectedIndex].dataset.lng]);
        }
        else if (type === "year") {
            setSelectedLayer(event.target.value)
        }
    };
    function filterDataByAddress(dataInput, addressInput) {
        const points = [];

        for (let index = 0; index < dataInput.length; index++) {
            const element = dataInput[index];
            if (element.location.state === addressInput) {
                points.push(element);
            }
        }
        return points
    }
    var dataMap = filterDataByAddress(api, eventUserAddresss)
    if (Object.keys(api).length === 0) {
        props.callApi()
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <span className="sr-only">Loading...</span>
                <Spinner animation="border" role="status">
                </Spinner>
            </div>
        );
    }
    if (Object.keys(api).length !== 0) {
        if (selectedYear === '') {
            setSelectedLayer(year[year.length - 1].toString())
        }
        if (Object.keys(pollutionState).length===0) {
            setPollutionState(typeOfPollutions)
        }
        else if (selectedYear !== '' && Object.keys(pollutionState).length!==0 ) {
            return (
                <div className='map-container'>
                    <MapNav />
                    <div className="body-wrapper">
                        <MapSidebar conscious={conscious} onOptionChange={handleOptionChange} onTypeChange={handleTypeChange} listOfYear={year} selectedYear={selectedYear} typeOfPollutions={pollutionState} />
                        <Mapbody data={dataMap} listOfYear={year} selectedYear={selectedYear} center={centerLatLng} typeOfPollutions={pollutionState} />
                    </div>
                </div>
            );
        }
    }
}

export default Map;
