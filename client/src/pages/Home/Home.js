import "./HomeLayout.scss"
import HomeNav from 'components/HomeNav';
import Slider from 'components/Slider/';
import Footer from 'components/Footer';
import HomeBody from "components/HomeBody/HomeBody";

function Home() {
    return (
        <div className="HomeLayout">
            <HomeNav className="nav"/>
            <Slider className="slider"/>
            <HomeBody className="body"/>
            <Footer className="footer"/>
        </div>
    );
}

export default Home;
