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
    console.log("words", words);
    return res.redirect("/index");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//체크박스 수정
// router.patch("/:checkboxId", function (req, res, next) {
//   const checkboxId = req.params.checkboxId;
//   Word.update(
//     {
//       status: req.body.status,
//     },
//     {
//       where: { id: checkboxId }, //word의 id
//     }
//   )
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Word was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update word with id=${checkboxId}. Maybe Tutorial was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: `Error updating Word with id=${checkboxId}`,
//       });
//       console.log(err);
//     });
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
          message: "Word was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update word with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Word with id=" + id,
      });
      console.log(err);
    });
});

//삭제 : status 상태 "D"
router.patch("/:deleteId", function (req, res, next) {
  const deleteId = req.params.deleteId;
  console.log(deleteId);
  Word.update(
    {
      status: "D",
    },
    {
      where: { id: deleteId }, //word의 id
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Word was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update word with id=${deleteId}. Maybe Word was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating UserInfo with id=${deleteId}`,
      });
      console.log(err);
    });
});

//단어 찾기
// router.get("/:english", async (req, res, next) => {
//   // const english = decodeURIComponent(req.params.english); //검색어
//   const english = req.params.english;
//   try {
//     const findWords = Word.findAll({
//       attributes: ["english", "korean", "status"],
//       where: {
//         english: english,
//       },
//     });
//     console.log("findWords", findWords);
//     return res.redirect("/index");
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
