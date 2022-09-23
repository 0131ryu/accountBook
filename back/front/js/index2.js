// function validWords(english, korean, type) {
//   const validEnglish = /^[a-zA-Z\s]+$/;
//   const validKorean = /^[가-힣\s]+$/; //띄어쓰기 포함
//   const validTypes = ["easy", "middle", "advance"];

//   if (!validEnglish.test(english) || !validKorean.test(korean)) {
//     alert("영어 입력에는 영어만, 한글 입력에는 한글만 입력해주세요");
//     return false;
//   }

//   if (!validTypes.includes(type)) {
//     alert("생성 시 필요한 type에 문제가 있습니다. 확인 부탁드립니다.");
//     return false;
//   }
// }

// async function getAddWord(english, korean, type) {
//   try {
//     await axios.post(`/word/write`, { english, korean, type });
//     window.location.reload();
//   } catch (err) {
//     console.error(err);
//   }
// }

// //word 생성(빈 값일 때도 값이 입력됨)
// function getAddWordEasy(event) {
//   const english = document.querySelector(".english-easy").value;
//   const korean = document.querySelector(".korean-easy").value;
//   console.log("english", english, "korean", korean);
//   const type = event.target.dataset.type;

//   if (!validWords(english, korean, type) || !english || !korean) {
//     alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
//   } else {
//     getAddWord(english, korean, type);
//   }
// }

// function getAddWordMiddle(event) {
//   const english = document.querySelector(".english-middle").value;
//   const korean = document.querySelector(".korean-middle").value;
//   console.log("english", english, "korean", korean);
//   const type = event.target.dataset.type;

//   validWords(english, korean, type);
//   if (!english || !korean) {
//     alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
//   } else {
//     getAddWord(english, korean, type);
//   }
// }

// function getAddWordAdvance(event) {
//   const english = document.querySelector(".english-advance").value;
//   const korean = document.querySelector(".korean-advance").value;
//   console.log("english", english, "korean", korean);
//   const type = event.target.dataset.type;

//   validWords(english, korean, type);
//   if (!english || !korean) {
//     alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
//   } else {
//     getAddWord(english, korean, type);
//   }
// }

//word 수정
async function getChangeWord(event) {
  const english = prompt("수정할 영어단어를 입력하세요");
  const korean = prompt("수정할 단어 뜻을 입력하세요");
  const type = prompt("수정할 타입(easy, middle, advance)을 입력하세요");
  const id = event.target.dataset.id;
  console.log("id", event.target.dataset.id);
  event.preventDefault();

  validWords(english, korean, type);

  if (!type) {
    alert("수정할 타입을 입력해주세요");
    return false;
  }

  try {
    await axios.put(`/word/${id}`, { english, korean, type });
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
  english.value = "";
  korean.value = "";
}

//status 수정(A, C, D)
async function getStatus(event) {
  let status = "";

  if (event.target.closest(".word-status").id === "A") {
    status = "A";
  } else if (event.target.closest(".word-status").id === "D") {
    let result = confirm("정말로 단어를 삭제 하시겠습니까?");
    if (result === true) {
      alert("확인을 눌렀습니다.");
      status = "D";
    } else {
      alert("취소를 눌렀습니다.");
      status = "A";
    }
  }

  const wordId = event.target.dataset.id;
  console.log("id", event.target.dataset.id);
  console.log("status", event.target.closest(".word-status").id);
  console.log("final status", status);

  event.preventDefault();

  try {
    await axios.patch(`/word/${wordId}`, { status: status });
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

//수정 - 체크박스
const checkboxes = document.querySelectorAll(".check_item input");
const checkAll = document.querySelector(".check_all input");

const agree = {
  checkitem: false,
};

checkboxes.forEach((item) => item.addEventListener("input", toggleCheckbox));

async function toggleCheckbox(event) {
  const { checked, id } = event.target;
  agree[id] = checked;
  this.parentNode.classList.toggle("active");
  checkAllStatus();

  const status = event.target.checked ? "C" : "A";
  const wordId = event.target.dataset.id;
  console.log("id", event.target.dataset.id);
  console.log("status", status);

  try {
    await axios.patch(`/word/${wordId}`, { status: status });
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}
function checkAllStatus() {
  const { checkitem } = agree;
  if (checkitem) {
    checkAll.checked = true;
  } else {
    checkAll.checked = false;
  }
}

checkAll.addEventListener("click", (event) => {
  const { checked } = event.target;
  if (checked) {
    checkboxes.forEach((item) => {
      item.checked = true;
      agree[item.id] = true;
      item.parentNode.classList.add("active");
    });
  } else {
    checkboxes.forEach((item) => {
      item.checked = false;
      agree[item.id] = false;
      item.parentNode.classList.remove("active");
    });
  }
  const status = event.target.checked ? "C" : "A";
  const wordId = event.target.dataset.id;
  console.log("id", event.target.dataset.id);
  console.log("status", status);

  try {
    axios.patch(`/word/status/1`, { status: status });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (err) {
    console.error(err);
  }
});

async function getSearchWord(event) {
  const english = document.querySelector(".word-find-eng").value;
  const id = event.target.dataset.id;
  console.log("id", id);

  const validEnglish = /^[a-zA-Z\s]+$/;

  if (!validEnglish.test(english)) {
    alert("찾으려는 단어는 영어만 입력해주세요.");
    return false;
  }

  try {
    const result = await axios
      .get(`/word/${id}/${english}`, { english: english, id: id })
      .then((res) => {
        console.log("res", res.data);
        console.log("type", res.data.type);
        console.log("한글", res.data.korean);

        const $resultInfo = document.querySelector(".word-find-result");
        console.log("$resultInfo", $resultInfo);
        $resultInfo.style.visibility = "visible";

        const wordInfo = res.data;

        const findEnglish = wordInfo.english;
        const findKorean = wordInfo.korean;
        const findType = wordInfo.type;

        const resultEnglish = document.querySelector(".word-find-result-eng");
        const resultKorean = document.querySelector(".word-find-result-kor");
        const resultType = document.querySelector(".word-find-result-type");
        resultEnglish.innerHTML = `${findEnglish}`;
        resultKorean.innerHTML = `${findKorean}`;
        resultType.innerHTML = `${findType}`;
      })
      .catch((error) => {
        alert("찾으려는 단어가 없습니다.");
        const $resultInfo = document.querySelector(".word-find-result");
        console.log("$resultInfo", $resultInfo);
        $resultInfo.style.visibility = "hidden";
        console.log(error.res);
      });
  } catch (err) {
    console.error(err);
  }
}

function getStatusD(event) {
  const deletedWords = document.querySelector(".deletedItems");
  deletedWords.toggleAttribute("hidden");
}

async function getStatusA(event) {
  let status = event.target.dataset.status;
  const wordId = event.target.dataset.id;
  console.log("id", wordId);
  console.log(status);

  let result = confirm("단어를 복구하시겠습니까?");
  if (result === true) {
    alert("확인을 눌렀습니다.");
    status = "A";
    console.log("status", status);
  } else {
    alert("취소를 눌렀습니다.");
    status = "D";
    console.log("status", status);
  }

  try {
    await axios.patch(`/word/${wordId}`, { status: status });
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function getDelete(event) {
  const id = event.target.dataset.id;
  console.log("id", id);
  try {
    if (confirm("[최종삭제] 삭제 후 새로 생성해야 합니다.")) {
      await axios
        .delete(`/word/${id}`)
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } catch (err) {
    console.error(err);
  }
}
