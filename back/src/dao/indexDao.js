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

exports.selectValidWord = async function (userIdx, wordIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectValidWordQuery =
        "select * from words where userIdx = ? and wordIdx = ? and not(status = 'D');";
      const selectValidWordParams = [userIdx, wordIdx];

      const [row] = await connection.query(
        selectValidWordQuery,
        selectValidWordParams
      );
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### selectValidWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### selectValidWord DB error ###### ${err}`);
    return false;
  }
};

exports.updateWord = async function (
  userIdx,
  wordIdx,
  english,
  korean,
  status
) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const updateWordQuery =
        "update words set english = ifnull(?, english), korean = ifnull(?, korean), status = ifnull(?, status) where userIdx = ? and wordIdx = ?";
      const updateWordParams = [english, korean, status, userIdx, wordIdx];

      const [row] = await connection.query(updateWordQuery, updateWordParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### updateWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### updateWord DB error ###### ${err}`);
    return false;
  }
};

exports.deleteWord = async function (userIdx, wordIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const deleteWordQuery =
        "update words set status = 'D' where userIdx = ? and wordIdx = ?";
      const deleteWordParams = [userIdx, wordIdx];

      const [row] = await connection.query(deleteWordQuery, deleteWordParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### deleteWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### deleteWord DB error ###### ${err}`);
    return false;
  }
};

exports.FindWordByEng = async function (userIdx, english) {
  //(userIdx, english, korean)
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const findWordQuery =
        "select english from words where userIdx = ? and english = ? and not(status = 'D'); ";
      const findWordParams = [userIdx, english];

      const [row] = await connection.query(findWordQuery, findWordParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### findWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### findWord DB error ###### ${err}`);
    return false;
  }
};
