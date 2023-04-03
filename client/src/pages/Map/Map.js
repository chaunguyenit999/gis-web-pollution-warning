import MapNav from 'components/MapNav';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import './Map.scss';

function Map() {
    return (
        <div className='map-container'>
            <MapNav />
            <div className="body-wrapper">
                <MapSidebar />
                <Mapbody />
            </div>
        </div>
    );
}

export default Map;
