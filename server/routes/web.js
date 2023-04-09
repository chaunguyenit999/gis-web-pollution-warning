const router = require("express").Router();
const airController = require("../controllers/air");
const waterController = require("../controllers/water");


const initWebRoute = (app) => {

    /**
    * @description AIR ROUTES
    */

    router.get('/airs', airController.getAllAirInforAdmin);
    router.get('/airs/:add', airController.getOneAirInforAdmin);//
    router.delete('/airs/:id', airController.deleteAirInforByIdAdmin);
    router.post('/airs', airController.addAirInfoAdmin);
    router.get('/airs/:id', airController.updateAirInforByIdAdmin);//
    router.put('/airs/:id', airController.updateAirInforByIdAdmin2);//

    /**
    * @description WATER ROUTES
    */

    router.get('/waters', waterController.getAllWaterInforAdmin);
    router.get('/waters/:add', waterController.getOneWaterInforAdmin);//
    router.delete('/waters/:id', waterController.deleteWaterInforByIdAdmin);
    router.post('/waters', waterController.addWaterInfoAdmin);
    router.get('/waters/:id', waterController.updateWaterInforByIdAdmin);//
    router.put('/waters/:id', waterController.updateWaterInforByIdAdmin2);//


    return app.use("/api/v1/admin", router);
}


module.exports = initWebRoute