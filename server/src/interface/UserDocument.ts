import IBookDocument from "./BookDocument"
 
export default interface IUserDocument  {
  id: string;
  username: string;
  email: string;
  password: string;
  savedBooks:  IBookDocument[] ;
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}