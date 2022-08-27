const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //아이디만 저장
  });
  passport.deserializeUser((id, done) => {
    //req.user 사용 시 여기서 가져옴
    User.findOne({
      where: { id },
      //내가 쓴 게시물 가져오고 싶으면
      //include [{model: Post}]
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
