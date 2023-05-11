const NodeGeocoder = require('node-geocoder');

// Tạo một instance của geocoder với tùy chọn
const geocoder = NodeGeocoder({
  provider: 'openstreetmap'
});
const findCity = {
    city : (data)=>{
    const latitude = data.latitude;
    const longitude = data.longitude;
    geocoder.reverse({lat: latitude, lon: longitude}, function (err, result) {
    return result[0].city;
    })
    }
}
module.exports = findCity;