const express = require("express");

const { isLoggedIn } = require("./middlewares");
const { User, Follow } = require("../../models");

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
router.post("/:id/unfollow", async (req, res, next) => {
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
router.patch("/:id/nickname", async (req, res, next) => {
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

module.exports = router;
