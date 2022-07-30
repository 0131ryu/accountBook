const mysql = require("mysql2/promise");
const { databaseSecret } = require("../front/js/secret");

exports.pool = mysql.createPool(databaseSecret);
