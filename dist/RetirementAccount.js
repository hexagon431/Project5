"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RetirementAccount = /** @class */ (function () {
    function RetirementAccount(name, birthday) {
        this.balance = 100000;
        this.accountHistory = [];
        this.accountType = 3;
        this.theDate = new Date();
        this.withdrawalsByPhoneOrWeb = 0;
        this.withdrawalsFromBranch = 0;
        this.accountHolderName = name;
        this.accountHolderBirthDate = birthday;
        var currentYear = this.theDate.getFullYear();
        var birthYear = birthday.getFullYear();
        var currentMonth = this.theDate.getMonth();
        var birthMonth = birthday.getMonth();
        var currentDay = this.theDate.getDate();
        var birthDay = birthday.getDate();
        this.accountHolderAge = currentYear - birthYear;
        if (birthMonth < currentMonth) {
            this.accountHolderAge--;
        }
        else if (birthMonth == currentMonth && birthDay < currentDay) {
            this.accountHolderAge--;
        }
    }
    RetirementAccount.prototype.advanceDate = function (numberOfDays) {
        if (numberOfDays >= 1) {
            console.log(this.theDate);
            var howManyMonths = 0;
            for (var d = 1; d <= numberOfDays; d++) {
                var initMonth = this.theDate.getMonth();
                this.theDate.setDate(this.theDate.getDate() + 1);
                if (initMonth !== this.theDate.getMonth()) {
                    howManyMonths++;
                    this.withdrawalsByPhoneOrWeb = 0;
                    this.withdrawalsFromBranch = 0;
                    this.accountHistory = [];
                }
            }
            if (howManyMonths > 0) {
                this.balance = this.calculateInterest(this.balance, howManyMonths);
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
    RetirementAccount.prototype.withdrawMoney = function (amount, description, transactionOrigin) {
        var trans;
        amount = Math.abs(amount);
        if (this.accountHolderAge < 60) {
            amount = (Math.round(amount + (amount * .10)) * 100) / 100;
            console.log("account holder younger than 60 - 10% withdrawal fee charged");
        }
        if (transactionOrigin == 1 || transactionOrigin == 2) {
            this.withdrawalsByPhoneOrWeb++;
            if ((this.balance - amount) >= 0 && this.withdrawalsByPhoneOrWeb <= 6) {
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
                    errorMessage: 'ERROR: withdrawal limit by phone or web hit'
                };
                this.accountHistory.push(trans);
                return trans;
            }
        }
        else if (transactionOrigin == 3) {
            this.withdrawalsFromBranch++;
            if ((this.balance - amount) >= 0 && this.withdrawalsFromBranch <= 1000) {
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
                    errorMessage: 'ERROR: withdrawals from branch limit hit'
                };
                this.accountHistory.push(trans);
                return trans;
            }
        }
    };
    RetirementAccount.prototype.depositMoney = function (amount, description) {
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
    RetirementAccount.prototype.calculateInterest = function (bal, numberOfMonths) {
        var totalInterest = 0;
        for (var i = 1; i <= numberOfMonths; i++) {
            totalInterest += (Math.round(((bal * 0.03) / 12) * 100) / 100);
        }
        console.log("interest calculated for " + numberOfMonths + " months");
        return (bal + totalInterest);
    };
    return RetirementAccount;
}());
exports.RetirementAccount = RetirementAccount;
//# sourceMappingURL=RetirementAccount.js.map