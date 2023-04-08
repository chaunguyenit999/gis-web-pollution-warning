import iconBlackImg from "./../../assets/images/PointBlack.png";
import iconRedImg from "./../../assets/images/PointRed.png";
import iconYellowImg from "./../../assets/images/PointYellow.png";
import L from 'leaflet';

// function get center of multiple points
function caculateCenterRadius(array){

    // get lat long center point
    let bounds = L.latLngBounds(array);
    let center = bounds.getCenter();

    let radius = center.distanceTo(array[0]);

    // caculate the radius of circle
    for (let index = 1; index < array.length; index++) {
      const element = array[index];
      let distance = center.distanceTo(element)
      if (radius < distance) {
        radius = distance
      }
    }

    return [center, radius];
  }

// icon
const iconBlack = L.icon({
    iconUrl: iconBlackImg,
    iconSize: [28, 30],
    iconAnchor: [15, 30],
  });

  const iconRed = L.icon({
    iconUrl: iconRedImg,
    iconSize: [40, 40],
    iconAnchor: [20, 33],
  });

  const iconYellow = L.icon({
    iconUrl: iconYellowImg,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  export { caculateCenterRadius, iconBlack, iconRed, iconYellow };
