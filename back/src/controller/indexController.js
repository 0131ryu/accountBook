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
  //english는 영어로만 korean은 한글로만 입력하기
  const validEnglish = /^[a-zA-Z\s]+$/;
  const validKorean = /^[가-힣\s]+$/;

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
        isSuccess: true,
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

exports.updateWords = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  let { wordIdx, english, korean, status } = req.body;

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
    korean,
    status
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
