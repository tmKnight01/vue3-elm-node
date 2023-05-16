const v1 = require("./v1");
const v2 = require('./v2');
const router = (app) => {
  app.use("/v1", v1);
  app.use('/v2',v2);
};

module.exports = router;
