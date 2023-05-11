// Libaries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Modules
import Home from 'pages/Home';
import Map from 'pages/Map';
import { useState } from 'react';
import axios from 'axios';

function App() {

    const [api, setApi] = useState({});

    function fecthAPi(type) {
        axios.get(`http://localhost:8080/api/v1/${type}`)
            .then((response)=> {
                setApi(response.data);
            })
            .catch(error => console.error(error))

    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home callApi ={fecthAPi}/>} />
                <Route exact path="/map" element={<Map callApi ={fecthAPi} data={api} />} />
            </Routes>
        </Router>
    );
}

export default App;
