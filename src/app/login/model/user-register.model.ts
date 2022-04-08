export interface IRegisterWithEmail {
    firstName : string,
    lastName: string,
    email:string,
    isAdmin:boolean,
    createdAt:Date,
    updatedAt:Date,
    gender:String,
    phoneNumber:Number,
    _id:String,
   
}

export class UserRegister implements IRegisterWithEmail{
constructor(){}
    firstName!: string;
    lastName!: string;
    email!: string;
    isAdmin!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
    gender!:String;
    phoneNumber!:Number;
    _id!:String;
 
}