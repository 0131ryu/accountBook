function welcom(message="Welcome", userName="Everyone"): void{
    console.log (`${message} ${userName}`);
}

welcom() //Welcome Everyone
welcom("Nice to See U,") // Nice to See U Everyone
welcom("You must be","James") // You must be James

//tsc front/js/test.ts