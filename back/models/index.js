"use strict";
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

//Models
const User = require("./user");
const Post = require("./post");
const Hashtag = require("./hashtag");
const Word = require("./word");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Word = Word;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Word.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Word.associate(db);

module.exports = db;
