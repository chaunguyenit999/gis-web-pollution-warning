import "./Slider.scss"
import slider from './../../assets/images/slider.jpg';
import Button from "components/Button/Button";

function Slider() {
  return (
    <div className="slider">
      <div className="text-above">
        <span>WEBGIS CẢNH BÁO Ô NHIỄM MÔI TRƯỜNG</span>
        <Button paleyellow to="/map" className="gotomap-btn">Xem bản đồ</Button>
      </div>
      <img src={slider} alt="slider" />
    </div>
  );
}

export default Slider;