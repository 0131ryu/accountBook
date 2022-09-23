"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
export const __esModule = true;
import axios_1 from "axios";
var a = axios_1["default"];
function validWords(english, korean, type) {
  var validEnglish = /^[a-zA-Z\s]+$/;
  var validKorean = /^[가-힣\s]+$/; //띄어쓰기 포함
  var validTypes = ["easy", "middle", "advance"];
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
function getAddWord(english, korean, type) {
  return __awaiter(this, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          console.log("english", "korean", "type", english, korean, type);
          return [
            4 /*yield*/,
            a.post("/word/write", {
              english: english,
              korean: korean,
              type: type,
            }),
          ];
        case 1:
          _a.sent();
          return [
            4 /*yield*/,
            a.post("/word/write", {
              english: english,
              korean: korean,
              type: type,
            }),
          ];
        case 2:
          _a.sent();
          window.location.reload();
          return [3 /*break*/, 4];
        case 3:
          err_1 = _a.sent();
          console.error(err_1);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
var easyButton = document.getElementById("matrix-easy");
var middleButton = document.getElementById("matrix-middle");
var advanceButton = document.getElementById("matrix-advance");
easyButton === null || easyButton === void 0
  ? void 0
  : easyButton.addEventListener("click", function (event) {
      var english = document.getElementById("english-easy").value;
      var korean = document.getElementById("korean-easy").value;
      var type = document.getElementById("type-easy").value;
      console.log("type", type);
      if (typeof type === "string") {
        if (!validWords(english, korean, type) || !english || !korean) {
          alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
        } else {
          getAddWord(english, korean, type);
        }
      }
    });
middleButton === null || middleButton === void 0
  ? void 0
  : middleButton.addEventListener("click", function (event) {
      var english = document.getElementById("english-middle").value;
      var korean = document.getElementById("korean-middle").value;
      var type = document.getElementById("type-middle").value;
      if (typeof type === "string") {
        if (!validWords(english, korean, type) || !english || !korean) {
          alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
        } else {
          getAddWord(english, korean, type);
        }
      }
    });
advanceButton === null || advanceButton === void 0
  ? void 0
  : advanceButton.addEventListener("click", function (event) {
      var english = document.getElementById("english-advance").value;
      var korean = document.getElementById("korean-advance").value;
      var type = document.getElementById("type-advance").value;
      if (typeof type === "string") {
        if (!validWords(english, korean, type) || !english || !korean) {
          alert("정확하게 값이 입력되었는지 다시 확인 바랍니다.");
        } else {
          getAddWord(english, korean, type);
        }
      }
    });
