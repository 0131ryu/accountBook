const indexDao = require("../dao/indexDao");

exports.createdWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { english, korean, type } = req.body;

  if (!userIdx || !english || !korean || !type) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "입력 값이 누락됬습니다.",
    });
  }

  //중복된 단어 검사
  const isDuplicatedEngWord = await indexDao.selectDuplicatedWord(
    userIdx,
    english
  );

  // console.log("단어 길이 검사", isDuplicatedEngWord.length);
  // console.log("userIdx", userIdx, "english", english);

  if (isDuplicatedEngWord.length > 0) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "이미 입력된 단어입니다.",
    });
  }

  //english는 영어로만 korean은 한글로만 입력하기
  const validEnglish = /^[a-zA-Z\s]+$/;
  const validKorean = /^[가-힣\s]+$/; //띄어쓰기 포함

  console.log(validKorean.test(korean));
  if (!validEnglish.test(english) || !validKorean.test(korean)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "english는 영어로만, korean은 한글로만 입력하세요",
    });
  }

  const validTypes = ["easy", "middle", "advance"];
  if (!validTypes.includes(type)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "유효한 타입이 아닙니다.",
    });
  }

  const insertWordsRow = await indexDao.insertWords(
    userIdx,
    english,
    korean,
    type
  );

  if (!insertWordsRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "단어 생성에 실패했습니다. 확인 부탁드립니다.",
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    message: "단어 생성 성공",
  });

  console.log(insertWordsRow);
};

exports.readWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const words = {};
  const types = ["easy", "middle", "advance"];

  for (let type of types) {
    let selectWordsByTypeRows = await indexDao.selectWordByType(userIdx, type);

    if (!selectWordsByTypeRows) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "단어 조회 실패, 확인 부탁드립니다.",
      });
    }
    words[type] = selectWordsByTypeRows;
  }
  return res.send({
    result: words,
    isSuccess: true,
    code: 200,
    message: "단어 조회 성공",
  });
};

exports.updateCheckedWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  let { wordIdx, status } = req.body;

  console.log("wordIdx", wordIdx);
  console.log("status", status);

  if (!userIdx || !wordIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "userIdx, wordIdx를 보내주세요",
    });
  }
  const updateCheckedWordStatusRow = await indexDao.updateCheckedWordStatus(
    userIdx,
    wordIdx,
    status
  );
  if (!updateCheckedWordStatusRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: `체크박스 수정 오류, 확인 부탁드립니다.`,
    });
  }
  // console.log(updateCheckedWordStatusRow);
};

exports.updateWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  let { wordIdx, english, korean } = req.body;

  if (!userIdx || !wordIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "userIdx, wordIdx를 보내주세요",
    });
  }

  if (!english) {
    english = null;
  }

  if (!korean) {
    korean = null;
  }

  const isValidWordRow = await indexDao.selectValidWord(userIdx, wordIdx);

  if (isValidWordRow.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: `유효한 요청이 아닙니다. userIdx, wordIdx를 확인하세요`,
    });
  }
  const updateWordRow = await indexDao.updateWord(
    userIdx,
    wordIdx,
    english,
    korean
  );
  if (!updateWordRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: `수정 실패, 확인 부탁드립니다.`,
    });
  }
  // console.log(updateWordRow);
};

exports.deleteWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { wordIdx } = req.params;

  if (!userIdx || !wordIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "userIdx, wordIdx를 입력해주세요",
    });
  }

  const isValidWordRow = await indexDao.selectValidWord(userIdx, wordIdx);

  if (isValidWordRow.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: `(delete)유효한 요청이 아닙니다. userIdx, wordIdx를 확인하세요`,
    });
  }

  const deleteWordRow = await indexDao.deleteWord(userIdx, wordIdx);

  if (!deleteWordRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "삭제 실패, 관리자에게 문의하세요",
    });
  }
  return res.send({
    isSuccess: true,
    code: 200,
    message: "삭제 성공",
  });
};

exports.findWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { english } = req.params;
  const words = {};

  if (!userIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "userIdx를 입력해주세요",
    });
  }

  const findWordResult = await indexDao.findWordByEng(userIdx, english);

  const [wordInfo] = findWordResult;
  // console.log("wordInfo", wordInfo);

  if (wordInfo === undefined) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "단어를 찾지 못했습니다. 다시 입력해주세요",
    });
  }

  return res.send({
    result: { wordInfo },
    isSuccess: true,
    code: 200,
    message: "단어 찾기 성공",
  });
};

exports.deletedWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { status } = req.params;
  const words = {};
  const types = ["easy", "middle", "advance"];

  for (let type of types) {
    let deletedWordsByTypeRows = await indexDao.deletedWordsList(
      userIdx,
      status
    );

    if (!deletedWordsByTypeRows) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "단어 조회 실패, 확인 부탁드립니다.",
      });
    }
    words[type] = deletedWordsByTypeRows;
  }
  return res.send({
    result: words,
    isSuccess: true,
    code: 200,
    message: "단어 조회 성공",
  });
};

exports.changeStatus = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { wordIdx } = req.params;

  let changeStatussRows = await indexDao.changeStatus(userIdx, wordIdx);

  if (!changeStatussRows) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "단어 복구 실패",
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    message: "단어 복구 성공",
  });
};
