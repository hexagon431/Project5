import {CheckingAccount} from "./CheckingAccount";
import {SavingsAccount} from "./SavingsAccount";
import {RetirementAccount} from "./RetirementAccount";

//TEST CHECKING ACCOUNT
let bDay = new Date();
bDay.setFullYear(1969, 3, 20);
let checking = new CheckingAccount("John Bankaccount", bDay);

checking.advanceDate(70);
console.log(checking.balance);

checking.depositMoney(200, "slam dunking 200 hot ones into my checking account you know what's going on");

checking.withdrawMoney(50, "AYO I JUST BOUGHT 50 DOLLARS WORTH OF CABBAGE", 1);
console.log(checking.accountHistory);
console.log(checking.balance);

checking.advanceDate(30);
console.log(checking.balance);

checking.withdrawMoney(10000, "this isnt going to work lol", 2);
console.log(checking.accountHistory);


console.log("-------------------------------------------");

//TEST SAVINGS ACCOUNT
let bDay2: Date = new Date();
bDay2.setFullYear(1980, 6, 12);
let savings = new SavingsAccount("Ron Bankaccount", bDay2);
savings.advanceDate(30);
console.log(savings.balance);

savings.depositMoney(400, "400 smackers b o i i i ");
console.log(savings.accountHistory);
console.log(savings.balance);

savings.withdrawMoney(20, "yea", 1);
console.log(savings.accountHistory);
savings.withdrawMoney(20, "yea", 1);
savings.withdrawMoney(20, "yea", 1);
savings.withdrawMoney(20, "yea", 1);
savings.withdrawMoney(20, "yea", 1);
savings.withdrawMoney(20, "yea", 1);
savings.withdrawMoney(20, "yea", 1);
console.log(savings.accountHistory);

savings.advanceDate(30);
savings.withdrawMoney(20, "yea", 1);
console.log(savings.accountHistory);

console.log("-------------------------------------------");

//TEST RETIREMENT ACCOUNT
let bDay3 = new Date();
bDay3.setFullYear(1950, 5, 10);
let retirement = new RetirementAccount("Shaun Bankaccount", bDay3);

retirement.advanceDate(60);
console.log(retirement.balance);

retirement.depositMoney(300, "poi");
console.log(retirement.accountHistory);

retirement.withdrawMoney(30, "beep boop", 1);
console.log(retirement.accountHistory);
retirement.withdrawMoney(30, "beep boop", 1);
retirement.withdrawMoney(30, "beep boop", 1);
retirement.withdrawMoney(30, "beep boop", 1);
retirement.withdrawMoney(30, "beep boop", 1);
retirement.withdrawMoney(30, "beep boop", 1);
retirement.withdrawMoney(30, "beep boop", 1);
console.log(retirement.accountHistory);

retirement.advanceDate(30);
retirement.withdrawMoney(30, "beep boop", 1);
console.log(retirement.accountHistory);

console.log("-------------------------------------------");

//TEST RETIREMENT ACCOUNT WHERE THE ACCOUNT OWNER IS YOUNGER THAN 60
let bDay4: Date = new Date();
bDay4.setFullYear(2000, 8, 8);
let youngRetirement = new RetirementAccount("Don Bankaccount", bDay4);

youngRetirement.withdrawMoney(40, "i should get a 10% fee for this", 1);
console.log(youngRetirement.accountHistory);