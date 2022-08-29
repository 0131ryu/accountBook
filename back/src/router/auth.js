const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../../models/user");

const router = express.Router();

//회원가입
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    console.log(exUser);
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      password: hash,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

//로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  //passport 폴더 항목 사용
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/main?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/index");
    });
  })(req, res, next);
});

//로그아웃
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  res.redirect("/main");
});

//카카오
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/main",
  }),
  (req, res) => {
    res.redirect("/main");
  }
);

module.exports = router;
