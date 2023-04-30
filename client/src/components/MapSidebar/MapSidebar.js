import "./MapSidebar.scss";
import {Accordion} from "react-bootstrap";
import { Link } from "react-router-dom";

function MapSidebar(props) {
  const handleOptionChange = (event) => {
    props.onOptionChange(event);
  };
  const handleOptionClick = (type) => {
    props.onOptionClick(type);
  };

  return (
    <div className="body-sidebar-wrapper">
      <div className="sidebar-logo">
        <Link>HUMG - IT</Link>
      </div>
      <div className="sidebar-menu-items">
        <div className="menu-items-header">CHỌN VÙNG QUAN TÂM</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header>Theo tỉnh thành</Accordion.Header>
            <Accordion.Body className="accordion-item-toggle-body">
              <select onChange={handleOptionChange}>
                <option value="Ha Nam" data-lat="20.583520" data-lng="105.922990">Hà Nam</option>
                <option value="Ha Tay" data-lat="14.29597" data-lng="108.11915">Hà Tây</option>
                <option value="Bac Ninh" data-lat="21.121444" data-lng="106.111050">Bắc Ninh</option>
              </select>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="menu-items-header">DỮ LIỆU QUAN TRẮC</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header onClick={() => handleOptionClick("air")} >Chất lượng không khí</Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="accordion-item-toggle">
            <Accordion.Header onClick={() => handleOptionClick("earth")} >Chất lượng đất</Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="accordion-item-toggle">
            <Accordion.Header onClick={() => handleOptionClick("water")}>Chất lượng nước</Accordion.Header>
          </Accordion.Item>
        </Accordion>
        <div className="menu-items-header">DỮ LIỆU MẠNG TÍCH HỢP</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header>Dữ liệu từ mạng xã hội</Accordion.Header>
            <Accordion.Body>
              <p>Dữ liệu từ mạng xã hội</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default MapSidebar;
