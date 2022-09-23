function welcom(message, userName) {
    if (message === void 0) { message = "Welcome"; }
    if (userName === void 0) { userName = "Everyone"; }
    console.log("".concat(message, " ").concat(userName));
}
welcom(); //Welcome Everyone
welcom("Nice to See U,"); // Nice to See U Everyone
welcom("You must be", "James"); // You must be James
function sum(a, b) {
    return a + b;
}
sum(10, 20);
//tsc front/js/test.ts
