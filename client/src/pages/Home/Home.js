import HomeNav from 'components/HomeNav';
import Slider from 'components/Slider/';
import Footer from 'components/Footer';
import HomeBody from "components/HomeBody/HomeBody";

function Home() {
    return (
        <div>
            <HomeNav/>
            <Slider/>
            <HomeBody/>
            <Footer/>
        </div>
    );
}

export default Home;
