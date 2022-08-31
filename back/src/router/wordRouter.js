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

//내용 수정
router.put("/:id", function (req, res, next) {
  const id = req.params.id;

  Word.update(
    {
      english: req.body.english,
      korean: req.body.korean,
    },
    {
      where: { id: id }, //word의 id
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserInfo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update word with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating UserInfo with id=" + id,
      });
      console.log(err);
    });
});

//삭제 : status 상태 "D"
// router.put("/:deleteId", function (req, res, next) {
//   const deleteId = req.params.id;

//   Word.update(
//     {
//       status: "D",
//     },
//     {
//       where: { id: deleteId }, //word의 id
//     }
//   )
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "UserInfo was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update word with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating UserInfo with id=" + id,
//       });
//       console.log(err);
//     });
// });

//단어 찾기
// router.get("/:english", async (req, res, next) => {
//   const english = decodeURIComponent(req.params.english); //검색어
//   const UserId = req.query.id;

//   Word.findOne({
//     attributes: ["id", "english", "korean", "status"],
//     where: {
//       english: english,
//     },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "UserInfo was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot find word with english=${english}`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating UserInfo with id=" + english,
//       });
//       console.log(err);
//     });
// });
module.exports = router;
