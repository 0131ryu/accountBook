const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User, Hashtag, Word } = require("../../models");
const { Op, fn, col, literal } = require("sequelize");
const sequelize = require("sequelize");

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
  try {
    if (req.user) {
      const words = await Word.findAll({
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
      const total = await Word.count({
        include: {
          model: User,
          attributes: ["id"],
        },
        where: {
          UserId: req.user.id,
          // UserId: {
          //   [Op.or]: [0, req.user.id],
          // },
          // [Op.or]: [{ UserId: undefined }, { UserId: req.user.id }],
        },
      });
      const counting = await Word.count({
        include: {
          model: User,
          attributes: ["id"],
        },
        where: {
          status: "C",
          UserId: req.user.id,
          // UserId: {
          //   [Op.or]: [0, req.user.id],
          // },
          // [Op.or]: [{ UserId: undefined }, { UserId: req.user.id }],
        },
      });
      const deletedWord = await Word.findAll({
        include: {
          model: User,
          attributes: ["id"],
        },
        attributes: ["id", "english", "korean", "type", "status"],
        where: {
          status: "D",
          UserId: req.user.id,
        },
        order: [["createdAt", "DESC"]],
      });
      res.render("index", {
        title: "engWord",
        words: words,
        wordsEasy: wordsEasy,
        wordsMiddle: wordsMiddle,
        wordsAdvance: wordsAdvance,
        total: total,
        counting: counting,
        deletedWord: deletedWord,
      });
    } else {
      const words = await Word.findAll({
        include: {
          model: User,
          attributes: ["id", "nickname"],
        },
        order: [["createdAt", "DESC"]],
      });
      res.render("index", {
        title: "engWord",
        words: words,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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
    if (req.user) {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "nickname"],
          },
          {
            model: User,
            attributes: ["id", "nickname"],
            as: "Liker",
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      console.log("posts[0].Liker", posts[0].Liker);
      posts.forEach((post) => {
        //post.User.id와 post.Liker.id가 같을 경우 true, 아니면 false
        post.liked = !!post.Liker.find((v) => v.id === req.user?.id);
      });
      res.render("main", {
        title: "engWordSNS",
        twits: posts,
      });
    } else {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "nickname"],
          },
          {
            model: User,
            attributes: ["id", "nickname"],
            as: "Liker",
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.render("main", {
        title: "engWordSNS",
        twits: posts,
      });
    }
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
