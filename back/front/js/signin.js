//토큰 검사
const token = localStorage.getItem("w-access-token");
if (token) {
  alert("로그아웃 후 이용해주세요");
  location.href = "main.html";
}

const $buttonSignIn = document.querySelector("#signIn");
const $inputEamil = document.querySelector("#email");
const $inputPassword = document.querySelector("#password");

$buttonSignIn.addEventListener("click", signIn);

//로그인 처리
async function signIn(event) {
  currentEmail = $inputEamil.value;
  currentPassword = $inputPassword.value;

  if (!currentEmail || !currentPassword) {
    return false;
  }
  const config = {
    method: "post",
    url: url + "/signIn",
    data: {
      email: currentEmail,
      password: currentPassword,
    },
  };
  try {
    const res = await axios(config);
    console.log(res);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }
    localStorage.setItem("w-access-token", res.data.result.token);
    alert(res.data.message);
    location.href = "main.html";
  } catch (error) {
    console.log(error);
  }
}
