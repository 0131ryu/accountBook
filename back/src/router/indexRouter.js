const indexController = require("../controller/indexController");
const { jwtMiddleware } = require("../../jwtMiddleware");

exports.indexRouter = function (app) {
  app.post("/words", jwtMiddleware, indexController.createdWords);
  app.get("/words", jwtMiddleware, indexController.readWords);
  //체크박스 클릭했을 경우
  app.patch("/checkedWord", jwtMiddleware, indexController.updateCheckedWords);
  //수정 아이콘 클릭했을 경우 내용 수정
  app.patch(
    "/word/:wordIdx/:english/:korean",
    jwtMiddleware,
    indexController.updateWords
  );
  app.delete("/word/:wordIdx", jwtMiddleware, indexController.deleteWords);
  app.get("/findWords/:english", jwtMiddleware, indexController.findWords);
  app.get("/deletedWords/:status", jwtMiddleware, indexController.deletedWords);
  app.patch(
    "/changeStatus/:wordIdx",
    jwtMiddleware,
    indexController.changeStatus
  );
};
