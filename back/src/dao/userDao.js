const { pool } = require("../../database");

exports.insertUser = async function (email, password, nickname) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const insertUserQuery =
        "insert into users (email, password, nickname) values (?, ?, ?);";
      const insertUserParmas = [email, password, nickname];

      const [row] = await connection.query(insertUserQuery, insertUserParmas);
      return row; //추가해야 함
    } catch (error) {
      console.error(`#### getUserRows Query error ######`);
      return false;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`#### getUserRows DB error ######`);
    return false;
  }
};

exports.selectUserbyEmail = async function (email) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserByEmailQuery = "select * from users where email = ?";
      const selectUserByEmailParmas = [email];

      const [row] = await connection.query(
        selectUserByEmailQuery,
        selectUserByEmailParmas
      );
      return row; //추가해야 함
    } catch (error) {
      console.error(`#### selectUserByEmail Query error ######`);
      return false;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`#### selectUserByEmail DB error ######`);
    return false;
  }
};

exports.selectUser = async function (email, password) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQuery =
        "select * from users where email = ? and password = ?";
      const selectUserParmas = [email, password];

      const [row] = await connection.query(selectUserQuery, selectUserParmas);
      return row; //추가해야 함
    } catch (error) {
      console.error(`#### selectUser Query error ######`);
      return false;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`#### selectUser DB error ######`);
    return false;
  }
};

exports.selectUserTokenByUserIdx = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectNicknameByUserQuery = "select * from users where userIdx = ?";
      const selectNicknameByUserParmas = [userIdx];

      const [row] = await connection.query(
        selectNicknameByUserQuery,
        selectNicknameByUserParmas
      );
      return row; //추가해야 함
    } catch (error) {
      console.error(`#### selectUser Query error ######`);
      return false;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`#### selectUser DB error ######`);
    return false;
  }
};
