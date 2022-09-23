import axios, { AxiosError, AxiosResponse } from "axios"

interface Created {}

interface Config<D = any> {
    method?: 'post' | 'get' |'put' | 'patch' | 'delete' | 'head' | 'options',
    url?: string,
    data?: D;
  }

interface A {
    //응답 자체는 AxiosResponse
    //T = AxiosResponse.data
    get: <T, R = AxiosResponse<T>>(url: string) => Promise<R>,
    post: <T, R = AxiosResponse<T>, D = any>(url: string, data: D) => Promise<R>,
    (config: Config): void,
    (url: string, config:Config): void,
    isAxiosError: <T>(error: unknown) => error is AxiosError
  }

const a: A = axios;

function validWords<T extends string>(english: T, korean: T, type: T) {
    const validEnglish = /^[a-zA-Z\s]+$/;
    const validKorean = /^[가-힣\s]+$/; //띄어쓰기 포함
    const validTypes = ["easy", "middle", "advance"];
  
    if (!validEnglish.test(english) || !validKorean.test(korean)) {
      alert("영어 입력에는 영어만, 한글 입력에는 한글만 입력해주세요");
      return false;
    }
  
    if (!validTypes.includes(type)) {
      alert("생성 시 필요한 type에 문제가 있습니다. 확인 부탁드립니다.");
      return false;
    }
    return true;
  }

  async function getAddWord<T extends string>(english: T, korean: T, type: T) {
    try {
      console.log("english", "korean", "type", english, korean, type)
      await a.post<Created, AxiosResponse<Created>>('/word/write', { english, korean, type })
      await a.post(`/word/write`, { english, korean, type });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  
const easyButton = document.getElementById("matrix-easy");
const middleButton = document.getElementById("matrix-middle");
const advanceButton = document.getElementById("matrix-advance");

  easyButton?.addEventListener("click", (event) => {
    const english =(document.getElementById("english-easy") as HTMLInputElement).value;
    const korean =(document.getElementById("korean-easy") as HTMLInputElement).value;
    const type = (document.getElementById("type-easy") as HTMLInputElement).value;;

    console.log("type", type)

    if(typeof type === "string") {
        if (!validWords(english, korean, type) || !english || !korean) {
        alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
        } else {
        getAddWord(english, korean, type);
        }
    }
  })

  middleButton?.addEventListener("click", (event) => {
    const english =(document.getElementById("english-middle") as HTMLInputElement).value;
    const korean =(document.getElementById("korean-middle") as HTMLInputElement).value;
    const type = (document.getElementById("type-middle") as HTMLInputElement).value;;

    if(typeof type === "string") {
        if (!validWords(english, korean, type) || !english || !korean) {
        alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
        } else {
        getAddWord(english, korean, type);
        }
    }
  })

  advanceButton?.addEventListener("click", (event) => {
    const english =(document.getElementById("english-advance") as HTMLInputElement).value;
    const korean =(document.getElementById("korean-advance") as HTMLInputElement).value;
    const type = (document.getElementById("type-advance") as HTMLInputElement).value;;

    if(typeof type === "string") {
        if (!validWords(english, korean, type) || !english || !korean) {
        alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
        } else {
        getAddWord(english, korean, type);
        }
    }
  })