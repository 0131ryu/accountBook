readWords();

async function readWords() {
  const token = localStorage.getItem("w-access-token");
  if (!token) {
    return;
  }
  const config = {
    method: "get",
    url: url + "/words",
    headers: {
      "w-access-token": token,
    },
  };
  try {
    const res = await axios(config);
    const wordDataSet = res.data.result;
    //console.log(wordDataSet);

    for (let section in wordDataSet) {
      //console.log(section);

      //각 섹션에 해당하는 ul 태그 선택
      const sectionUl = document.querySelector(`#${section} ul`);
      //각 섹션에 해당하는 데이터
      const arrayForEachSection = wordDataSet[section];
      //console.log(arrayForEachSection);

      let result = "";
      for (let words of arrayForEachSection) {
        let element = `   <li class="list-item" id="${words.wordsIdx}">
      <div class="done-text-container">
          <input type="checkbox" class="words-done" ${
            words.status === "C" ? "checked" : ""
          }/>
          <p class="words-text">${words.english}</p>
          <p class="words-text">${words.korean}</p>
      </div>
      <div class="update-delete-container">
      <i class="words-update fa-solid fa-pencil"></i>
          <i class="words-delete fa-solid fa-trash-can"></i>
      </div>
  </li>`;
        result += element;
      }
      sectionUl.innerHTML = result;
    }

    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
  } catch (err) {
    console.error(err);
  }
}
