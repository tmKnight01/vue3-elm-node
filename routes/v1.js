const  express = require('express') ;
const CityHandle = require('../controller/v1/cites') ;
const Chatchapng = require('../controller/v1/captchs');
const SearchHandle = require('../controller/v1/search');


const router = express.Router();


router.get('/cities',CityHandle.getCity);
router.get('/captchs',Chatchapng.getChatchapng)
router.get('/city',CityHandle.getCityById);
router.get('/search',SearchHandle.search)


module.exports=  router;