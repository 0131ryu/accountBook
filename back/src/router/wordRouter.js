const express = require("express");

const { User, Word } = require("../../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();
router.use((req, res, next) => {
  //공통으로 쓰임
  res.locals.user = req.user;
  next();
});

router.post("/easy", isLoggedIn, async (req, res, next) => {
  const { english, korean, type } = req.body;
  try {
    const word = await Word.create({
      userId: req.user.id,
      english,
      korean,
      type,
      status: req.params.id,
    });
    console.log("word", word);
    res.redirect("/index");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
