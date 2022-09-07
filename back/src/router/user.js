const express = require("express");

const { isLoggedIn } = require("./middlewares");
const { User, Post } = require("../../models");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//belongsTomany
router.post("/:id/unfollow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      const result = await user.removeFollowing(parseInt(req.params.id, 10));
      res.json(result);
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//닉네임 변경
router.patch("/:id/nickname", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      const result = await user.update(
        {
          nickname: req.body.nickname,
        },
        {
          where: { id: id }, //word의 id
        }
      );
      res.json(result);
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    //작성된 글을 찾음
    const posts = await Post.findOne({ where: { id: req.params.id } });
    if (posts) {
      await posts.addLiker(req.user.id);
      res.json(posts);
    } else {
      res.status(404).send("작성된 글을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:id/unlike", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    await post.removeLiker(req.user.id);
    res.send("success");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
