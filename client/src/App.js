// Libaries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Modules
import Home from 'pages/Home';
import Map from 'pages/Map';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/map" element={<Map />} />
            </Routes>
        </Router>
    );
}

export default App;
