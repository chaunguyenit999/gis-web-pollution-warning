const router = require("express").Router();
const airController = require("../controllers/air");
const waterController = require("../controllers/water");
const soilController = require("../controllers/soil");
const resultAll = require("../controllers/result");


const initWebRoute = (app) => {

    /**
    * @description AIR ROUTES
    */
    app.get('/admin/getallair', airController.getAllAirInforAdmin);
    
    app.get('/admin/getoneair/:add', airController.getOneAirInforAdmin);
    
    app.post('/admin/insertair', airController.addAirInfoAdmin);  

    app.get('/admin/deleteoneair/:id', airController.deleteAirInforByIdAdmin);
    
    app.get('/admin/updateoneair/:id', airController.updateAirInforByIdAdmin);
    app.post('/admin/updateoneair/:id', airController.updateAirInforByIdAdmin2);
    
    /**
    * @description WATER ROUTES
    */

    app.get('/admin/getallwater', waterController.getAllWaterInforAdmin);

    app.get('/admin/getonewater/:add', waterController.getOneWaterInforAdmin);

    app.post('/admin/insertwater', waterController.addWaterInfoAdmin);

    app.get('/admin/deleteonewater/:id', waterController.deleteWaterInforByIdAdmin);

    app.get('/admin/updateonewater/:id', waterController.updateWaterInforByIdAdmin);
    app.put('/admin/updateonewater/:id', waterController.updateWaterInforByIdAdmin2);

    /**
    * @description WATER ROUTES
    */

    app.get('/admin/getallsoil', soilController.getAllSoilInforAdmin);

    app.get('/admin/getonesoil/:add', soilController.getOneSoilInforAdmin);
    
    app.post('/admin/insertsoil', soilController.addSoilInfoAdmin);
    
    app.get('/admin/deleteonesoil/:id', soilController.deleteSoilInforByIdAdmin);
    
    app.get('/admin/updateonesoil/:id', soilController.updateSoilInforByIdAdmin);
    app.put('/admin/updateonesoil/:id', soilController.updateSoilInforByIdAdmin2);


    app.get('/admin/resultallair', resultAll.resultAllAir)
    app.get('/admin/resultallwater', resultAll.resultAllWater)
    app.get('/admin/resultallsoil', resultAll.resultAllSoil)

}


module.exports = initWebRoute
