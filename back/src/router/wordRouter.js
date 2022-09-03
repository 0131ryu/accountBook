const express = require("express");

const { User, Word } = require("../../models");
const { isLoggedIn } = require("./middlewares");
const { Op } = require("sequelize");

const router = express.Router();
router.use((req, res, next) => {
  //공통으로 쓰임
  res.locals.user = req.user;
  next();
});

//단어 쓰기
router.post("/write", isLoggedIn, async (req, res, next) => {
  const { english, korean, type } = req.body;
  console.log("userId", req.user.id);
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

//수정 : status 상태에 따라 값이 변함
//A : 기본 | C : checkbox:checked | D : 삭제
router.patch("/:wordId", function (req, res, next) {
  try {
    const wordId = req.params.wordId;

    Word.update(
      {
        status: req.body.status,
      },
      {
        where: { id: wordId }, //word의 id
      }
    );
    console.log("req.body", req.body);
    console.log("req.body.status", req.body.status);
    res.send("update done");
    // res.redirect("/index");
  } catch (err) {
    console.error(err);
    next(err);
  }
  // .then((num) => {
  //   if (num == 1) {
  //     res.send({
  //       message: "Word was updated successfully.",
  //     });
  //   } else {
  //     res.send({
  //       message: `Cannot update word with id=${wordId}. Maybe Tutorial was not found or req.body is empty!`,
  //     });
  //   }
  // })
  // .catch((err) => {
  //   res.status(500).send({
  //     message: "Error updating Word with id=" + wordId,
  //   });
  //   console.log(err);
  // });
});

//모든 status : "C"
router.patch("/status/1", function (req, res, next) {
  try {
    // const wordId = req.params.wordId;

    Word.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: {
            [Op.gt]: 0,
          },
        },
      }
    );
    console.log("req.body", req.body);
    console.log("req.body.status", req.body.status);
    res.send("update done");
    // res.redirect("/index");
  } catch (err) {
    console.error(err);
    next(err);
  }
  // .then((num) => {
  //   if (num == 1) {
  //     res.send({
  //       message: "Word was updated successfully.",
  //     });
  //   } else {
  //     res.send({
  //       message: `Cannot update word with id=${wordId}. Maybe Tutorial was not found or req.body is empty!`,
  //     });
  //   }
  // })
  // .catch((err) => {
  //   res.status(500).send({
  //     message: "Error updating Word with id=" + wordId,
  //   });
  //   console.log(err);
  // });
});

//단어 찾기
router.get("/find/:english", async (req, res, next) => {
  const english = req.params.english;
  try {
    const words = await Word.findOne({
      where: {
        english: english,
        [Op.or]: [{ status: "A" }, { status: "C" }],
      },
      attributes: ["english", "korean", "type"],
    });
    console.log("words", words);
    res.json(words.dataValues);
    // res.send("result find!");
    // res.render("index", { words: words });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
