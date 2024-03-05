export interface ITransaction {
  accountNumber:string
  amount: number;
}
export class Transaction implements ITransaction {
  constructor(public accountNumber: string,public amount: number){

  }
}
