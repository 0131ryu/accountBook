const { pool } = require("../../database");

exports.insertWords = async function (userIdx, english, korean, type) {
  //DB연결
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const insertWordQuery =
        "insert into words (userIdx, english, korean, type) values (?, ?, ?, ?);";
      const insertWordParams = [userIdx, english, korean, type];

      const [row] = await connection.query(insertWordQuery, insertWordParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### insertWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### insertWord DB error ###### ${err}`);
    return false;
  }
};

exports.selectWordByType = async function (userIdx, type) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectWordQuery =
        "select wordIdx, english, korean, status from words where userIdx = ? and type = ? and not(status = 'D');";
      const selectWordParams = [userIdx, type];

      const [row] = await connection.query(selectWordQuery, selectWordParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### selectWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### selectWord DB error ###### ${err}`);
    return false;
  }
};
