const express = require("express");

const { User, Word } = require("../../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();
router.use((req, res, next) => {
  //공통으로 쓰임
  res.locals.user = req.user;
  next();
});

//글쓰기
router.post("/easy", isLoggedIn, async (req, res, next) => {
  const { english, korean, type } = req.body;
  try {
    const wordsEasy = await Word.create({
      // 단어 등록
      UserId: req.user.id,
      english,
      korean,
      type,
      status: "A",
    });
    return res.redirect("/index");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/middle", isLoggedIn, async (req, res, next) => {
  const { english, korean, type } = req.body;
  try {
    const wordsMiddle = await Word.create({
      // 단어 등록
      UserId: req.user.id,
      english,
      korean,
      type,
      status: "A",
    });
    return res.redirect("/index");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/advance", isLoggedIn, async (req, res, next) => {
  const { english, korean, type } = req.body;
  try {
    const wordsAdvance = await Word.create({
      // 단어 등록
      UserId: req.user.id,
      english,
      korean,
      type,
      status: "A",
    });
    return res.redirect("/index");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
