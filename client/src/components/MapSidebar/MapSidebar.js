import "./MapSidebar.scss";
import {Accordion} from "react-bootstrap";
import { Link } from "react-router-dom";

function MapSidebar() {
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
              <select>
                <option>Hà Nam</option>
                <option>Hà Tây</option>
                <option>Bắc Ninh</option>
              </select>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="menu-items-header">DỮ LIỆU QUAN TRẮC</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header>Chất lượng không khí</Accordion.Header>
            <Accordion.Body>
              <p>Chất lượng không khí</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="accordion-item-toggle">
            <Accordion.Header>Chất lượng đất</Accordion.Header>
            <Accordion.Body>
             <p>Chất lượng đất</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="accordion-item-toggle">
            <Accordion.Header>Chất lượng không khí</Accordion.Header>
            <Accordion.Body>
              <p>Không khí</p>
            </Accordion.Body>
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
