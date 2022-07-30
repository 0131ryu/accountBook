const indexDao = require("../dao/indexDao");

exports.createdWords = async function (req, res) {
  const { userIdx, english, korean, type } = req.body;

  if (!userIdx || !english || !korean || !type) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "입력 값이 누락됬습니다.",
    });
  }
  //english는 영어로만 korean은 한글로만 입력하기
  //   const validEnglish = /[^a-zA-Z]/;
  //   const validKorean = /[^가-힣]/;

  //   if (english !== validEnglish && korean !== validKorean) {
  //     return res.send({
  //       isSuccess: false,
  //       code: 400,
  //       message: "english는 영어로만, korean은 한글로만 입력하세요",
  //     });
  //   }

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
