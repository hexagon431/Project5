import { Account } from './Account';

export class RetirementAccount implements Account {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    balance: number = 100000;
    accountHistory : Transaction[] = [];
    accountType: AccountType = 3;
    private theDate = new Date();
    private withdrawalsByPhoneOrWeb: number = 0;
    private withdrawalsFromBranch: number = 0;
    private accountHolderAge: number;

    constructor(name: string, birthday: Date){
        this.accountHolderName = name;
        this.accountHolderBirthDate = birthday;

        let currentYear = this.theDate.getFullYear();
        let birthYear = birthday.getFullYear();
        let currentMonth = this.theDate.getMonth();
        let birthMonth = birthday.getMonth();
        let currentDay = this.theDate.getDate();
        let birthDay = birthday.getDate();

        this.accountHolderAge = currentYear - birthYear;

        if (birthMonth < currentMonth){
            this.accountHolderAge--;
        }
        else if(birthMonth == currentMonth && birthDay < currentDay){
            this.accountHolderAge--;
        }
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
                    this.withdrawalsByPhoneOrWeb = 0;
                    this.withdrawalsFromBranch = 0;
                    this.accountHistory = [];
                }
            }

            if (howManyMonths > 0){
                this.balance = this.calculateInterest(this.balance, howManyMonths);
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

        if(this.accountHolderAge < 60){
            amount = (Math.round(amount + (amount * .10)) * 100) / 100;
            console.log("account holder younger than 60 - 10% withdrawal fee charged");
        }

        if(transactionOrigin == 1 || transactionOrigin == 2){
            this.withdrawalsByPhoneOrWeb++;

            if((this.balance - amount) >= 0 && this.withdrawalsByPhoneOrWeb <= 6){
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
                    errorMessage: 'ERROR: withdrawal limit by phone or web hit'
                };

                this.accountHistory.push(trans);

                return trans;
            }
        }
        else if(transactionOrigin == 3){
            this.withdrawalsFromBranch++;

            if((this.balance - amount) >= 0 && this.withdrawalsFromBranch <= 1000) {
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
                    errorMessage: 'ERROR: withdrawals from branch limit hit'
                };
                this.accountHistory.push(trans);

                return trans;
            }
        }
    }

    depositMoney(amount: number, description: string): Transaction {
        let trans: Transaction;

        if(amount >=0){
            this.balance = Math.round((this.balance + amount) * 100) / 100;

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
            totalInterest+=(Math.round(((bal * 0.03) / 12) * 100) / 100);
        }

        console.log(`interest calculated for ${numberOfMonths} months`);

        return (bal + totalInterest);
    }
}
