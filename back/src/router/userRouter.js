const userController = require("../controller/userController");
const { jwtMiddleware } = require("../../jwtMiddleware");

exports.userRouter = function (app) {
  //회원가입
  app.post("/signUp", userController.signUp);
  //로그인
  app.post("/signIn", userController.signIn);
  //jwt 검증
  app.get("/jwt", jwtMiddleware, userController.getToken);
};
