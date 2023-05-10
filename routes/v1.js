const  express = require('express') ;
const CityHandle = require('../controller/v1/cites') ;


const router = express.Router();


router.get('/cities',CityHandle.getCity);



module.exports=  router;