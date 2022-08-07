setHeader();

async function setHeader() {
  //로컬 스토리지에 토큰 존재 여부 검사
  const token = localStorage.getItem("w-access-token");
  //토큰이 없으면 signed에 hidden 클래스 붙이기
  if (!token) {
    const signed = document.querySelector(".signed");
    signed.classList.add("hidden");
    return;
  }

  const config = {
    method: "get",
    url: url + "/jwt",
    headers: {
      "w-access-token": token,
    },
  };

  const res = await axios(config);

  if (res.data.code !== 200) {
    console.log("잘못된 토큰입니다.");
    return;
  }

  const nickname = res.data.result.nickname;
  const spanNickname = document.querySelector("span#nickname");
  spanNickname.innerText = nickname;

  //토큰이 있다면 unsigned에 hidden 클래스 붙이기
  const unsigned = document.querySelector(".unsigned");
  unsigned.classList.add("hidden");
}

//로그아웃 기능
const buttonSignout = document.querySelector("#sign-out");

buttonSignout.addEventListener("click", signout);

function signout() {
  localStorage.removeItem("w-access-token");
  location.reload();
}
