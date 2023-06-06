import "./MapSidebar.scss";
import { Accordion, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Modal, Container, Row, Col } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MapSidebar(props) {
  // const handleClick = () => {
  //   console.log(1)
  // }
  // useEffect(() => {
  //   const element = document.getElementById("demo");
  //   element.addEventListener("click", handleClick);

  //   return () => {
  //     element.removeEventListener("click", handleClick);
  //   };
  // }, []);


  const [status, setStatus] = useState();
  const [timer, countdown] = useState();
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [showLink, setShowLink] = useState(false);

  // modal bootstrap and chart
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showModal, setShowModal] = useState("");
  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [dataChart, setDataChart] = useState({});

  const handleShow = () => {

    setOptions(
      {
        plugins: {
          title: {
            display: true,
            text: 'chất lượng ko khí 12 tháng qua',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }
    )
    setLabels(['January', 'February', 'March', 'April', 'May', 'June', 'July'])
    setDataChart({
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Dataset 3',
          data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
          backgroundColor: 'rgb(53, 162, 235)',
        },
      ],
    })
    function myFunction() {
      console.log(1)
    }
    function typeOfPollution(maxValue) {
      if (maxValue === 1) {
        return ['#4cb84c', "#000000", 'tốt']
      }
      else if (maxValue === 2) {
        return ['yellow', "#000000", 'trung bình']
      }
      else if (maxValue === 3) {
        return ['orange', "#000000", 'klm cho các nhóm nhạy cảm']
      }
      else if (maxValue === 4) {
        return ['grey', "#ffffff", 'không lành mạnh']
      }
      else if (maxValue === 5) {
        return ['#d81e1e', "#ffffff", 'rất không lành mạnh']
      }
      else if (maxValue === 6) {
        return ['#ab19ab', "#ffffff", 'nguy hiểm']
      }
    }
    setShowModal(
      <div>
        <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: "100%" }}>
          <colgroup>
            <col style={{ width: "7%" }} />
            <col style={{ width: "63%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2} style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#C1BABA' }}>Name</th>
              <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#C1BABA' }}>AQI</th>
              <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#C1BABA' }}>chất lượng</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((element, index) => {
              if (
                // eslint-disable-next-line
                element.date.year == props.selectedYear &&
                // eslint-disable-next-line
                element.date.month == props.selectedMonth
              ) {
                var mainPollutant = ''
                var valueMainPollutant = 0
                for (let index = 3; index < 5; index++) {
                  const key = Object.keys(element)[index];
                  if (mainPollutant === '') {
                    mainPollutant = key
                    valueMainPollutant = element[key].result
                  }
                  else {
                    if (valueMainPollutant < element[key].result) {
                      valueMainPollutant = element[key].result
                    }
                  }
                }
                return (
                  <div style={{ display: "table-row" }}>
                    <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                      <td onClick={myFunction}><div style={{ borderRadius: "50%", width: "100%", height: "100%", backgroundColor: typeOfPollution(valueMainPollutant)[0], color: typeOfPollution(valueMainPollutant)[0] }}>.....</div></td>
                    </div>
                    <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle"}}>
                      <td onClick={myFunction}>{element.location.address}</td>
                    </div>
                    <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                      <td onClick={myFunction}>{element[mainPollutant].aqi}</td>
                    </div>
                    <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                      <td onClick={myFunction}>{typeOfPollution(valueMainPollutant)[2]}</td>
                    </div>
                  </div>

                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    );
    setShow(true)

  };
  // end modal bootstrap and chart


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLink(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let seconds = 4;
    const timer = setInterval(() => {
      countdown(seconds)
      setStatus(false);
      seconds--;

      if (seconds < 0) {
        setStatus(true);
        clearInterval(timer);
      }
    }, 1000);
  }, [isStatusUpdated]);

  const handleDataTypeChange = (type) => {
    if (type !== props.selectedDataType) {
      setIsStatusUpdated(!isStatusUpdated);
      if (status) {
        props.onDataTypeChange(type);
      }
    }
  };

  const handleOptionChange = (event, type) => {
    props.onOptionChange(event, type);
  };

  const handleTypeChange = (event) => {
    props.onTypeChange(event);
  };




  return (
    <div className="body-sidebar-wrapper">
      <div className="sidebar-logo">
        {showLink ? (
          <Link to="/">HUMG - IT</Link>
        ) : (
          <Link>HUMG - IT</Link>
        )}

      </div>
      <div className="sidebar-menu-items">
        {props.selectedDataType === 'excel' && (
          <div>
            <div className="menu-items-header">CHỌN VÙNG QUAN TÂM</div>
            <Accordion>
              <Accordion.Item eventKey="0" className="accordion-item-toggle">
                <Accordion.Header>Theo tỉnh thành</Accordion.Header>
                <Accordion.Body className="accordion-item-toggle-body">
                  <Form.Select onChange={(event) => handleOptionChange(event, "tỉnh")}>
                    {Object.keys(props.conscious).map((key) => (
                      <option
                        value={key}
                        data-lat={props.conscious[key].latitude}
                        data-lng={props.conscious[key].longitude}
                      >
                        {key}
                      </option>
                    ))}
                  </Form.Select>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}

        <div className="menu-items-header">DỮ LIỆU QUAN TRẮC</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header onClick={() => (props.selectedDataType === 'excel') ? null : (status ? handleDataTypeChange("excel") : alert(`bạn đang ấn quá nhanh, mời thử lại sau ${timer} giây`))} >Chất lượng không khí</Accordion.Header>
            {props.selectedDataType === 'excel' && (
              <Accordion.Body className="accordion-item-toggle-body">
                <p>dữ liệu hiện thị cho:<br /> tháng {props.selectedMonth} năm {props.selectedYear}<br /> {Object.keys(props.typeOfPollutions).filter(key => props.typeOfPollutions[key].state === "1").map(key => key.toUpperCase()).join(", ")} </p>
                <Form.Select onChange={(event) => handleOptionChange(event, "year")}>
                  <option disabled selected>chọn năm</option>
                  {Object.values(props.listOfYear).map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </Form.Select>
                <Form.Select onChange={(event) => handleOptionChange(event, "month")}>
                  <option disabled selected>chọn tháng</option>
                  {Object.values(props.listOfMonth).map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </Form.Select>
                <Accordion style={{ marginTop: '5px' }}>
                  <Accordion.Item eventKey="0" className="accordion-item-toggle1">
                    <Accordion.Header className="cus">Chọn kiểu dữ liệu</Accordion.Header>
                    <Accordion.Body className="accordion-item-toggle-body1">
                      {Object.entries(props.typeOfPollutions).map(([key, value]) => (
                        <div className="form-check form-switch">
                          {
                            <input className="form-check-input" type="checkbox" value={value.state === '1' ? '1' : '0'} id={key} onChange={handleTypeChange} checked={value.state === '1' ? true : false} />
                          }
                          <label className="form-check-label">
                            {key.toUpperCase()}
                          </label>
                        </div>
                      ))}
                    </Accordion.Body>

                  </Accordion.Item>
                </Accordion>
                <Accordion style={{ marginTop: '5px' }}>
                  <Accordion.Item eventKey="0" className="accordion-item-toggle1">
                    <Accordion.Header className="cus" onClick={() => handleShow()}>Bộ lọc nâng cao</Accordion.Header>
                    <Modal show={show} onHide={handleClose} size="lg" centered>
                      <Modal.Header closeButton >
                        <Modal.Title>Modal</Modal.Title>
                      </Modal.Header>
                      <Modal.Body >
                        {/* <Modal.Body className="show-grid"> */}
                        <Container >
                          <Row className="custom-modal-body">
                            <Col className="col-1" xs={7} md={8}>
                              {showModal}
                            </Col>
                            <Col className="col-2" xs={5} md={4}>
                              <div class="ring">
                                <div class="value">
                                  <div class="number">21</div>
                                  <div class="units">aqi</div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Bar data={dataChart} options={options} />
                          </Row>
                        </Container>
                      </Modal.Body>
                    </Modal>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            )}
          </Accordion.Item>
        </Accordion>
        <div className="menu-items-header">DỮ LIỆU API TÍCH HỢP</div>
        <Accordion>
          <Accordion.Item eventKey="2" className="accordion-item-toggle">
            <Accordion.Header onClick={() => (props.selectedDataType === 'weatherApi') ? null : (status ? handleDataTypeChange("weatherApi") : alert(`bạn đang ấn quá nhanh, mời thử lại sau ${timer} giây`))} >Dữ liệu từ weather api</Accordion.Header>
            {/* <Accordion.Body>
              <p>Dữ liệu từ weather api</p>
            </Accordion.Body> */}
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default (MapSidebar);
