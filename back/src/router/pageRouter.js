const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User, Hashtag, Word } = require("../../models");

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
});

//영단어
router.get("/index", async (req, res, next) => {
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
      attributes: ["id", "english", "korean", "status"],
      where: {
        type: "easy",
      },
      order: [["createdAt", "DESC"]],
    });
    const wordsMiddle = await Word.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
      attributes: ["id", "english", "korean", "status"],
      where: {
        type: "middle",
      },
      order: [["createdAt", "DESC"]],
    });
    const wordsAdvance = await Word.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
      attributes: ["id", "english", "korean", "status"],
      where: {
        type: "advance",
      },
      order: [["createdAt", "DESC"]],
    });
    // const findWords = Word.findAll({
    //   attributes: ["english", "korean", "type"],
    //   where: {
    //     english: req.words.english,
    //     status: "A",
    //   },
    // });
    res.render("index", {
      title: "engWord",
      twits: posts,
      wordsEasy: wordsEasy,
      wordsMiddle: wordsMiddle,
      wordsAdvance: wordsAdvance,
      // words: findWords,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.post("/index/find", isLoggedIn, async (req, res, next) => {
//   try {
//     const words = Word.findAll({
//       attributes: ["english", "korean", "type"],
//       where: {
//         english: req.body.english,
//         status: "A",
//       },
//     });
//     res.render("index", {
//       words: words,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
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
  const query = req.query.hashtag;
  console.log("query", query);
  if (!query) {
    return res.redirect("/main");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
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
