export interface ITransfer {
  from: string;
  to: string;
  amount: number;
}
export class Transfer implements ITransfer {
  constructor(public from: string,public amount: number,public to:string){

  }
}
