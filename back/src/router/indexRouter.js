const indexController = require("../controller/indexController");

exports.indexRouter = function (app) {
  app.post("/words", indexController.createdWords);
  app.get("/words", indexController.readWords);
  app.patch("/word", indexController.updateWords);
  app.delete("/word/:wordIdx", indexController.deleteWords);
};
