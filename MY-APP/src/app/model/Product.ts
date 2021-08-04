
export class Product{

    id?:number;
    productName?:string;
    price?:number;


    constructor(productName:string,price:number,id:number){
        this.id=id;
        this.productName=productName;
        this.price=price;
    }
}