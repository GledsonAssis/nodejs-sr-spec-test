export default class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!RegExp(/^(.+)@(.+)$/).exec(value)) throw new Error("Invalid email");
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
