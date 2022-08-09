readWords();

async function readWords() {
  const token = localStorage.getItem("w-access-token");
  if (!token) {
    return;
  }
  //단어장 조회 api
  const config = {
    method: "get",
    url: url + "/words",
    headers: { "w-access-token": token },
  };
  try {
    const res = await axios(config);
    const wordDataSet = res.data.result;
    console.log(wordDataSet);

    //단어 개수
    const easyCount = Object.keys(wordDataSet.easy).length;
    const middleCount = Object.keys(wordDataSet.middle).length;
    const advanceCount = Object.keys(wordDataSet.advance).length;

    let checkedCount = 0;

    for (let i = 0; i < easyCount; i++) {
      const easyCheckedCount = wordDataSet.easy[i].status;
      console.log(easyCheckedCount);
      if (easyCheckedCount === "C") {
        checkedCount += 1;
      }
    }

    for (let i = 0; i < middleCount; i++) {
      const middleCheckedCount = wordDataSet.middle[i].status;
      console.log(middleCheckedCount);
      if (middleCheckedCount === "C") {
        checkedCount += 1;
      }
    }

    for (let i = 0; i < advanceCount; i++) {
      const advanceCheckedCount = wordDataSet.advance[i].status;
      console.log(advanceCheckedCount);
      if (advanceCheckedCount === "C") {
        checkedCount += 1;
      }
    }
    console.log(checkedCount);

    //총 단어 개수
    const allCount = easyCount + middleCount + advanceCount;
    console.log(allCount);

    const $checkedCountingAll = document.querySelector(
      `#word-counting-checked`
    );
    const $wordCountingAll = document.querySelector(`#word-counting-all`);

    $wordCountingAll.innerHTML = allCount;
    $checkedCountingAll.innerHTML = checkedCount;

    for (let section in wordDataSet) {
      // console.log(section);

      const $sectionUl = document.querySelector(`#${section} ul`);
      const arrayForEachSection = wordDataSet[section];
      console.log(arrayForEachSection);

      let result = "";
      for (let word of arrayForEachSection) {
        let element = ` <li class="list-item" id="${word.wordIdx}">
      <div class="done-text-container">
          <input type="checkbox" class="word-done" ${
            word.status === "C" ? "checked" : ""
          }/>
         <p class="word-text-eng">${word.english}</p>
          </div>
      <div class="done-text-container">
     <p class="word-text-kor">${word.korean}</p>  
      </div>
  <div class="update-delete-container">
  <i class="word-update fa-solid fa-pencil"></i>
      <i class="word-delete fa-solid fa-trash-can"></i>
  </div>
  </li>`;
        result += element;
        // console.log(result);
      }
      $sectionUl.innerHTML = result;
    }
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

//create
const $matrixContainer = document.querySelector(".matrix-container");
$matrixContainer.addEventListener("keypress", cudController);
$matrixContainer.addEventListener("click", cudController);

function cudController(event) {
  const token = localStorage.getItem("w-access-token");
  if (!token) {
    return;
  }
  const target = event.target;
  const className = target.className;
  const eventType = event.type;
  const key = event.key;
  // console.log(target.className);
  // console.log(eventType);
  // console.log(key);
  //create
  if (className === "matrix-input-btn-easy" && eventType === "click") {
    createWordsEasy(event, token);
    return;
  }

  if (className === "matrix-input-btn-middle" && eventType === "click") {
    createWordsMiddle(event, token);
    return;
  }

  if (className === "matrix-input-btn-advance" && eventType === "click") {
    createWordsAdvance(event, token);
    return;
  }
  //update - 체크박스
  if (className === "word-done" && eventType === "click") {
    updateWordDone(event, token);
    return;
  }

  //update - 수정하기
  const firstClassName = target.className.split(" ")[0];
  if (firstClassName === "word-update" && eventType === "click") {
    updateWordList(event, token);
    return;
  }

  //delete - 삭제하기
  if (firstClassName === "word-delete" && eventType === "click") {
    deleteWord(event, token);
    return;
  }
}

async function createWordsEasy(event, token) {
  const $english = document.querySelector(".matrix-input-eng-easy");
  const $korean = document.querySelector(".matrix-input-kor-easy");

  const english = $english.value;
  const korean = $korean.value;
  // console.log("english", english);
  // console.log("korean", korean);
  const type = event.target.closest(".matrix-item").id;
  // console.log(type);

  if (!english || !korean) {
    alert("영어, 한글 단어를 입력해주세요");
    return false;
  }
  const config = {
    method: "post",
    url: url + "/words",
    headers: { "w-access-token": token },
    data: {
      english: english,
      korean: korean,
      type: type,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
    readWords();
    $english.value = "";
    $korean.value = "";
    return true;
  } catch (err) {
    console.error(err);
  }
}

async function createWordsMiddle(event, token) {
  const $english = document.querySelector(".matrix-input-eng-middle");
  const $korean = document.querySelector(".matrix-input-kor-middle");

  const english = $english.value;
  const korean = $korean.value;
  // console.log("english", english);
  // console.log("korean", korean);
  const type = event.target.closest(".matrix-item").id;
  // console.log(type);

  if (!english || !korean) {
    alert("영어, 한글 단어를 입력해주세요");
    return false;
  }
  const config = {
    method: "post",
    url: url + "/words",
    headers: { "w-access-token": token },
    data: {
      english: english,
      korean: korean,
      type: type,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
    readWords();
    $english.value = "";
    $korean.value = "";
    return true;
  } catch (err) {
    console.error(err);
  }
}

async function createWordsAdvance(event, token) {
  const $english = document.querySelector(".matrix-input-eng-advance");
  const $korean = document.querySelector(".matrix-input-kor-advance");

  const english = $english.value;
  const korean = $korean.value;
  // console.log("english", english);
  // console.log("korean", korean);
  const type = event.target.closest(".matrix-item").id;
  // console.log(type);

  if (!english || !korean) {
    alert("영어, 한글 단어를 입력해주세요");
    return false;
  }
  const config = {
    method: "post",
    url: url + "/words",
    headers: { "w-access-token": token },
    data: {
      english: english,
      korean: korean,
      type: type,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
    readWords();
    $english.value = "";
    $korean.value = "";
    return true;
  } catch (err) {
    console.error(err);
  }
}

async function updateWordDone(event, token) {
  // console.log(event.target.checked);
  const status = event.target.checked ? "C" : "A";
  const wordIdx = event.target.closest(".list-item").id;

  //console.log(wordIdx);
  const config = {
    method: "patch",
    url: url + "/word",
    headers: { "w-access-token": token },
    data: {
      wordIdx: wordIdx,
      status: status,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
    readWords();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function updateWordList(event, token) {
  const english = prompt("수정할 영어단어를 입력하세요");
  const korean = prompt("수정할 단어 뜻을 입력하세요");

  const wordIdx = event.target.closest(".list-item").id;

  //console.log(wordIdx);
  const config = {
    method: "patch",
    url: url + "/word",
    headers: { "w-access-token": token },
    data: {
      wordIdx: wordIdx,
      english: english,
      korean: korean,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
    //DOM 업데이트
    readWords();
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function deleteWord(event, token) {
  const isValidReq = confirm(
    "삭제하시겠습니까? 삭제 후에는 복구가 어렵습니다."
  );
  const wordIdx = event.target.closest(".list-item").id;

  if (!isValidReq) {
    return false;
  }

  const config = {
    method: "delete",
    url: url + `/word/${wordIdx}`,
    headers: { "w-access-token": token },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
    //DOM 업데이트
    readWords();
  } catch (err) {
    console.error(err);
    return false;
  }
}
