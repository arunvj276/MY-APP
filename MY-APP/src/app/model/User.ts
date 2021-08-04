export class User{

    id?:number;
    userName?:string;
    role?:string;

    constructor(id:number,userName:string,role:string){

        this.id=id;
        this.userName=userName;
        this.role=role;
    }
}