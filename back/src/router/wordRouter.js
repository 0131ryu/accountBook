const express = require("express");

const { User, Word } = require("../../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();
router.use((req, res, next) => {
  //공통으로 쓰임
  res.locals.user = req.user;
  next();
});

//단어 쓰기
router.post("/write", isLoggedIn, async (req, res, next) => {
  const { english, korean, type } = req.body;
  try {
    const words = await Word.create({
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

//단어 찾기
// router.get("/english", isLoggedIn, async (req, res, next) => {
//   Word.findAll({
//     attributes: ["english", "korean", "type"],
//     where: {
//       english: req.body.english,
//       status: "A",
//     },
//   })
//     .then((words) => {
//       res.send(words);
//     })
//     .catch((err) => {
//       throw err;
//     });
// });

//체크박스 수정
// router.patch("/checkboxes", isLoggedIn, async (req, res, next) => {
//   const { english, korean, type } = req.body;
//   try {
//     const wordsAdvance = await Word.update({
//       include: {
//         model: Word,
//         attributes: ["id"],
//       },
//     });
//     return res.redirect("/index");
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
