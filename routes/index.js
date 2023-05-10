const v1 = require("./v1");

const router = (app) => {
  app.use("/v1", v1);
};

module.exports = router;
