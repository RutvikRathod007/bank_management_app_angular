interface ILoginModel
{
  mobileNumber:string
  password:string
}
export class LoginModel implements ILoginModel{
  constructor(
 public mobileNumber:string,
 public password:string

  ){}
}
