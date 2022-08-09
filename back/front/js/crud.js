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
    // console.log(wordDataSet);

    for (let section in wordDataSet) {
      // console.log(section);

      const $sectionUl = document.querySelector(`#${section} ul`);
      const arrayForEachSection = wordDataSet[section];
      // console.log(arrayForEachSection);

      let result = "";
      for (let word of arrayForEachSection) {
        let element = ` <li class="list-item" id="${word.wordIdx}">
      <div class="done-text-container">
          <input type="checkbox" class="word-done" ${
            word.status === "C" ? "checked" : ""
          }/>
         <p class="word-text-eng">${word.english}</p>
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
  const targetTagName = target.tagName;
  const eventType = event.type;
  const key = event.key;
  console.log(target, targetTagName, eventType, key);

  //create
  if (targetTagName === "BUTTON" && key === "click") {
    createWords(event, token);
    return;
  }
}

async function createWords(event, token) {
  const { english, korean } = event.target.value;
  const type = event.target.closest(".matrix-item").id;
  console.log(type);

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
    //DOM 업데이트
    readWords();
    event.target.value = "";
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
