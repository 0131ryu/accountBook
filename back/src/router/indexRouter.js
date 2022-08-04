const indexController = require("../controller/indexController");
const { jwtMiddleware } = require("../../jwtMiddleware");

exports.indexRouter = function (app) {
  app.post("/words", jwtMiddleware, indexController.createdWords);
  app.get("/words", jwtMiddleware, indexController.readWords);
  app.patch("/word", jwtMiddleware, indexController.updateWords);
  app.delete("/word/:wordIdx", jwtMiddleware, indexController.deleteWords);
};
