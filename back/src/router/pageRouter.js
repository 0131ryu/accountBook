const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User, Hashtag, Word } = require("../../models");
const { Op, fn, col, literal } = require("sequelize");

const router = express.Router();
router.use((req, res, next) => {
  //공통으로 쓰임
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map((f) => f.id)
    : [];
  next();

  console.log("res.locals.user", res.locals.user);
  console.log("req.user", req.user);
});

//영단어
router.get("/index", async (req, res, next) => {
  //유저 아이디 값을 params로 넘겨서 받아 개수로 받으면 어떨지?
  //post 결과 보려면 이 부분 넣어야 함
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
      order: [["createdAt", "DESC"]],
    });
    const wordsEasy = await Word.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
      attributes: ["id", "english", "korean", "status", "UserId"],
      where: {
        [Op.or]: [{ status: "A" }, { status: "C" }],
        type: "easy",
      },
      order: [["createdAt", "DESC"]],
    });
    const wordsMiddle = await Word.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
      attributes: ["id", "english", "korean", "status", "UserId"],
      where: {
        [Op.or]: [{ status: "A" }, { status: "C" }],
        type: "middle",
      },
      order: [["createdAt", "DESC"]],
    });
    const wordsAdvance = await Word.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
      attributes: ["id", "english", "korean", "status", "UserId"],
      where: {
        [Op.or]: [{ status: "A" }, { status: "C" }],
        type: "advance",
      },
      order: [["createdAt", "DESC"]],
    });
    //inner join
    const total = await Word.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
      order: [["createdAt", "DESC"]],
    });
    const count = await Word.count({
      where: {
        status: "C",
        // UserId: 1,
      },
    });
    const deletedWord = await Word.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
      attributes: ["id", "english", "korean", "type"],
      where: {
        status: "D",
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("index", {
      title: "engWord",
      twits: posts,
      wordsEasy: wordsEasy,
      wordsMiddle: wordsMiddle,
      wordsAdvance: wordsAdvance,
      total: total,
      count: count,
      deletedWord: deletedWord,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//단어 찾기
// router.get("/index/:english", async (req, res, next) => {
//   const english = req.params.english;
//   console.log("english", english);
//   try {
//     const words = await Word.findOne({
//       where: { english: english },
//       attributes: ["english", "korean", "type"],
//     });
//     console.log("words", words);
//     res.send("result find!");
//     // res.render(`index/${english}`, {
//     //   words: words,
//     // });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "내 정보 - engWordSNS" });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", { title: "회원가입 - engWordSNS" });
});

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login", { title: "로그인 - engWordSNS" });
});

//sns
router.get("/main", async (req, res, next) => {
  //post 결과 보려면 이 부분 넣어야 함
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "engWordSNS",
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/hashtag", async (req, res, next) => {
  const query = decodeURIComponent(req.query.hashtag);
  console.log("query", query);
  if (!query) {
    return res.redirect("/main");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({
        include: [{ model: User, attributes: ["id", "nickname"] }],
      });
    }
    return res.render("main", {
      title: `${query} || engWordSNS`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
