export class Customer{
        
        id?:number;
        mobileNumber?: number;
        name?: string;
        product?: string;
        price?: number;

        constructor(mobileNo?:number,name?: string,product?: string,price?: number){

                this.mobileNumber=mobileNo;
                this.name=name;
                this.product=product;
                this.price=price;
        }


    
}