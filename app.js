require("./db");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const router = require("./routes/index");
const session = require("express-session");

const app = express();

app.all("*", (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || "*";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "Express");
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
// app.use(express.json());   // 该中间件与formidable解析表单有冲突 在express 4.x以上的版本中 需要废弃该中间件
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: "SID",
    secret: "SID",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    },
  })
);


app.use(express.static(path.join(__dirname, "public")));
router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

process.on('uncaughtException', function (err) {
  console.log('Caught Exception:' + err);//直接捕获method中未被定义的错误，使node服务不会挂掉
});



module.exports = app;
