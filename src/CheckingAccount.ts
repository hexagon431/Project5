import { Account } from './Account';
import {displayClassName, displayClassNameWithPurpose} from "./decorators";

@displayClassNameWithPurpose(`to prove typescript wrong`)
export class CheckingAccount implements Account {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    balance: number = 1000;
    accountHistory : Transaction[] = [];
    accountType: AccountType = 1;
    private theDate: Date = new Date();
    private withdrawalCount: number = 0;

    constructor(name: string, birthday: Date){
        this.accountHolderName = name;
        this.accountHolderBirthDate = birthday;
    }

    advanceDate(numberOfDays: number) {
        if(numberOfDays >= 1){
            console.log(this.theDate);
            let howManyMonths: number = 0;

            for(let d = 1; d <= numberOfDays; d++){
                let initMonth = this.theDate.getMonth();

                this.theDate.setDate(this.theDate.getDate() + 1);

                if (initMonth !== this.theDate.getMonth()){
                    howManyMonths++;
                }
            }

            if (howManyMonths > 0){
                this.balance = this.calculateInterest(this.balance, howManyMonths);
                this.withdrawalCount = 0;
                this.accountHistory = [];
            }

            console.log(`date advanced ${numberOfDays} days`);
            console.log(this.theDate);
        }
        else if (numberOfDays == 0) {
            console.log("Date advanced 0 days.")
        }
        else{
            console.log("ERROR: can't go back in time you silly goose");
        }
    }

    withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
        let trans: Transaction;
        amount = Math.abs(amount);
        this.withdrawalCount++;

        if((this.balance - amount) >= 0 && this.withdrawalCount <= 1000){
            this.balance = Math.round((this.balance - amount) * 100) / 100;


            trans={
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
        else if ((this.balance - amount) < 0){
            trans={
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
        else{
            trans={
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
    }

    depositMoney(amount: number, description: string): Transaction {
        let trans: Transaction;

        if(amount >=0){
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
        else{
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
    }

    calculateInterest(bal: number, numberOfMonths: number): number{
        let totalInterest: number = 0;
        for(let i = 1; i <= numberOfMonths; i++){
            totalInterest+=(Math.round(((bal * 0.01) / 12) * 100) / 100);
        }

        console.log(`interest calculated for ${numberOfMonths} months and added to account`);

        return (Math.round((bal + totalInterest)*100) / 100);
    }

}