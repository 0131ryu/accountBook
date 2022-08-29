const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

//기존코드
const compression = require("compression");
const cors = require("cors");

dotenv.config();
//기존
// const { indexRouter } = require("./src/router/indexRouter");
// const { userRouter } = require("./src/router/userRouter");
//변경
const user = require("./src/router/user");
const auth = require("./src/router/auth");
const pageRouter = require("./src/router/pageRouter");
const postRouter = require("./src/router/postRouter");
const wordRouter = require("./src/router/wordRouter");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

passportConfig();
const app = express();
app.set("port", process.env.PORT || 4000);
app.set("view engine", "html");
nunjucks.configure("front", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));

//cors 설정
app.use(cors());

//정적 파일 제공
app.use(express.static(path.join(__dirname, "front")));

app.use(express.json());
app.use(compression());
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
//session보다 아래에 위치
app.use(passport.initialize());
app.use(passport.session());

//기존
// indexRouter(app);
// userRouter(app);

//변경
app.use("/", pageRouter);
app.use("/auth", auth);
app.use("/post", postRouter);
app.use("/user", user);
app.use("/word", wordRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
