function welcom(message="Welcome", userName="Everyone"): void{
    console.log (`${message} ${userName}`);
}

welcom() //Welcome Everyone
welcom("Nice to See U,") // Nice to See U Everyone
welcom("You must be","James") // You must be James

function sum(a: number, b: number) {
    return a +b;
}
sum(10, 20)

//tsc front/js/test.ts