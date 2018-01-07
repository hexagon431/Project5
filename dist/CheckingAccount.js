"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var CheckingAccount = /** @class */ (function () {
    function CheckingAccount(name, birthday) {
        this.balance = 1000;
        this.accountHistory = [];
        this.accountType = 1;
        this.theDate = new Date();
        this.withdrawalCount = 0;
        this.accountHolderName = name;
        this.accountHolderBirthDate = birthday;
    }
    CheckingAccount.prototype.advanceDate = function (numberOfDays) {
        if (numberOfDays >= 1) {
            console.log(this.theDate);
            var howManyMonths = 0;
            for (var d = 1; d <= numberOfDays; d++) {
                var initMonth = this.theDate.getMonth();
                this.theDate.setDate(this.theDate.getDate() + 1);
                if (initMonth !== this.theDate.getMonth()) {
                    howManyMonths++;
                }
            }
            if (howManyMonths > 0) {
                this.balance = this.calculateInterest(this.balance, howManyMonths);
                this.withdrawalCount = 0;
                this.accountHistory = [];
            }
            console.log("date advanced " + numberOfDays + " days");
            console.log(this.theDate);
        }
        else if (numberOfDays == 0) {
            console.log("Date advanced 0 days.");
        }
        else {
            console.log("ERROR: can't go back in time you silly goose");
        }
    };
    CheckingAccount.prototype.withdrawMoney = function (amount, description, transactionOrigin) {
        var trans;
        amount = Math.abs(amount);
        this.withdrawalCount++;
        if ((this.balance - amount) >= 0 && this.withdrawalCount <= 1000) {
            this.balance = Math.round((this.balance - amount) * 100) / 100;
            trans = {
                success: true,
                amount: amount,
                resultBalance: this.balance,
                transactionDate: this.theDate,
                description: description,
                errorMessage: ''
            };
            this.accountHistory.push(trans);
            return trans;
        }
        else if ((this.balance - amount) < 0) {
            trans = {
                success: false,
                amount: amount,
                resultBalance: this.balance,
                transactionDate: this.theDate,
                description: description,
                errorMessage: 'ERROR: insufficient funds in account'
            };
            this.accountHistory.push(trans);
            return trans;
        }
        else {
            trans = {
                success: false,
                amount: amount,
                resultBalance: this.balance,
                transactionDate: this.theDate,
                description: description,
                errorMessage: 'ERROR: withdrawal limit hit'
            };
            this.accountHistory.push(trans);
            return trans;
        }
    };
    CheckingAccount.prototype.depositMoney = function (amount, description) {
        var trans;
        if (amount >= 0) {
            this.balance = Math.round((this.balance + amount) * 100) / 100;
            trans = {
                success: true,
                amount: amount,
                resultBalance: this.balance,
                transactionDate: this.theDate,
                description: description,
                errorMessage: ''
            };
            this.accountHistory.push(trans);
            return trans;
        }
        else {
            trans = {
                success: false,
                amount: amount,
                resultBalance: this.balance,
                transactionDate: this.theDate,
                description: description,
                errorMessage: 'ERROR: cannot deposit a negative amount'
            };
            this.accountHistory.push(trans);
            return trans;
        }
    };
    CheckingAccount.prototype.calculateInterest = function (bal, numberOfMonths) {
        var totalInterest = 0;
        for (var i = 1; i <= numberOfMonths; i++) {
            totalInterest += (Math.round(((bal * 0.01) / 12) * 100) / 100);
        }
        console.log("interest calculated for " + numberOfMonths + " months and added to account");
        return (Math.round((bal + totalInterest) * 100) / 100);
    };
    CheckingAccount = __decorate([
        decorators_1.displayClassNameWithPurpose("to prove typescript wrong")
    ], CheckingAccount);
    return CheckingAccount;
}());
exports.CheckingAccount = CheckingAccount;
//# sourceMappingURL=CheckingAccount.js.map