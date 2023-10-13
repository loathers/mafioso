export default class ListItem {
  #name: string;
  #amount: number;

  constructor(name: string | undefined, amount: string | number | undefined) {
    if (typeof name === "undefined") {
      this.#name = "UNKNOWN";
    } else {
      this.#name = name;
    }

    if (typeof amount === "undefined") {
      this.#amount = 1;
    } else if (typeof amount === "string") {
      this.#amount = Number(amount) || 1;
    } else {
      this.#amount = amount;
    }
  }

  get displayName() {
    return this.#name;
  }

  get amount() {
    return this.#amount;
  }

  get displayAmount() {
    if (this.#amount <= 1) {
      return null;
    }

    return `(${this.#amount})`;
  }
}
