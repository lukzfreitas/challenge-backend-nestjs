export class MoneyModel {

    private amount: number;
    
    private currency: string;    

    constructor(amount: number, currency: string) {
        this.amount = amount;
        this.currency = currency;        
    }
}