import Email from "../vo/email";
import Name from "@/domain/vo/name";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
}

export default class User {
  private readonly id: string = "";
  private readonly name: Name;
  private readonly email: Email;

  constructor(user: IUser) {
    this.id = String(user?._id);
    this.name = new Name(user?.name);
    this.email = new Email(user?.email);
  }

  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  responseUser() {
    return {
      id: this.id ?? undefined,
      name: this.name.getValue(),
      email: this.email.getValue(),
    };
  }
}
