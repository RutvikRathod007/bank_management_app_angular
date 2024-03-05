export interface RegisterModel
{
  userName:string
  mobileNumber:string
  email:string
  password:string
  role:string
}
export class RegisterCustModel implements RegisterModel{
  constructor(
    public userName:string,
    public mobileNumber:string,
    public  email:string,
    public password:string,
    public role:string='customer'
  ){}
}
