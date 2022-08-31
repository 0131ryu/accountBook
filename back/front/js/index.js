const $matrixContainer = document.querySelector(".matrix-container");
$matrixContainer.addEventListener("click", cudController);

function cudController(event) {
  const target = event.target;
  const className = target.className;
  const eventType = event.type;
  const id = event.target.closest(".update-delete-container").id;

  console.log("target", target, "className", className);
  console.log("eventType", eventType, "id", id);

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

document
  .getElementById("word-update")
  .addEventListener("click", async (event) => {
    english = prompt("수정할 영어단어를 입력하세요");
    korean = prompt("수정할 단어 뜻을 입력하세요");
    event.preventDefault();

    console.log(english, korean, type);
    id;

    if (!english || !korean) {
      alert("영어, 한글 단어를 입력해주세요");
      return false;
    }

    try {
      await axios.put(`/:${id}`, { english, korean });
    } catch (err) {
      console.error(err);
    }
    english.value = "";
    korean.value = "";
    type.value = "easy";
  });
