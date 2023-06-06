const  express = require('express') ;
const CityHandle = require('../controller/v1/cites') ;
const Chatchapng = require('../controller/v1/captchs');

const router = express.Router();


router.get('/cities',CityHandle.getCity);
router.get('/captchs',Chatchapng.getChatchapng)
router.get('/city',CityHandle.getCityById);


module.exports=  router;