export interface ICustomer{
  customerId:number
  firstName:string;
  lastName:string;
  dob:string;
  mobileNumber:string;
  city:string;
  amount:number;
  accountType:string;
  customerImage:string
  accountNumber:string
}


export class Customer implements ICustomer
{
constructor(
public firstName:string,
public lastName:string,
public dob:string,
public mobileNumber:string,
public city:string,
public amount:number,
public accountType: string,
public customerImage: string,
public accountNumber:string,
public customerId:number
)
{

}
}
