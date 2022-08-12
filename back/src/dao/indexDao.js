const { pool } = require("../../database");

exports.selectDuplicatedWord = async function (userIdx, english) {
  //DB연결
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectDuplicatedWordQuery =
        "select * from words where userIdx =? and english = ?";
      const selectDuplicatedParams = [userIdx, english];

      const [row] = await connection.query(
        selectDuplicatedWordQuery,
        selectDuplicatedParams
      );
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### selectDuplicatedWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### selectDuplicatedWord DB error ###### ${err}`);
    return false;
  }
};

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

//체크 박스 수정
exports.updateCheckedWordStatus = async function (userIdx, wordIdx, status) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const updateCheckedWordQuery =
        "update words set status = ifnull(?, status) where userIdx = ? and wordIdx = ?;";
      const updateCheckedWordParams = [status, userIdx, wordIdx];

      const [row] = await connection.query(
        updateCheckedWordQuery,
        updateCheckedWordParams
      );
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### updateCheckedWord Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### updateCheckedWord DB error ###### ${err}`);
    return false;
  }
};

//내용 수정
exports.updateWord = async function (userIdx, wordIdx, english, korean) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const updateWordQuery =
        "update words set english = ifnull(?, english), korean = ifnull(?, korean) where userIdx = ? and wordIdx = ?;";
      const updateWordParams = [english, korean, userIdx, wordIdx];

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

exports.findWordByEng = async function (userIdx, english) {
  //(userIdx, english, korean)
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const findWordQuery =
        "select english, korean, type from words where userIdx = ? and english = ? and not(status = 'D'); ";
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

exports.deletedWordsList = async function (userIdx, type) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const deletedWordsQuery =
        "select wordIdx, english, korean, type, status from words where userIdx = ? and status = ?;";
      const deletedWordsParams = [userIdx, type];

      const [row] = await connection.query(
        deletedWordsQuery,
        deletedWordsParams
      );
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### deletedWords Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### deletedWords DB error ###### ${err}`);
    return false;
  }
};

exports.changeStatus = async function (userIdx, wordIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const changeStatusQuery =
        "update words set status = 'A' where userIdx = ? and wordIdx = ?;";
      const changeStatusParams = [userIdx, wordIdx];

      const [row] = await connection.query(
        changeStatusQuery,
        changeStatusParams
      );
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### changeStatus Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### changeStatus DB error ###### ${err}`);
    return false;
  }
};
