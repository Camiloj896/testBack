export default class CostDto {

    id: string;
    type: string;
    amount: Number;
    value: Number;
    totalCost: Number;
    createAt: Date;   

    constructor( id:string, type: string, amount: Number, value: Number, totalCost: Number, createAt: Date){
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.value = value;
        this.totalCost = totalCost;
        this.createAt = createAt;
        
    }

    // //GETTERS
    // public getId(): string { return this.id; }
    // public getType(): string { return this.type; }
    // public getValue(): Number { return this.value; }
    // public getAmount(): Number { return this.amount; }
    // public getTotalCost(): Number{ return this.totalCost; }
    // public getCreateAt(): Date{ return this.createAt; }    

    // //SETTERS
    // public setId(id: string) { this.id = id; }
    // public setType(type: string){ this.type = type; }
    // public setValue(value: Number) { this.value = value; }
    // public setAmount(amount: Number) { this.amount = amount; }
    // public setTotalCost(totalCost: Number) : void { this.totalCost = totalCost; }
    // public setCreateAt(createAt: Date){ this.createAt = createAt; }    

}