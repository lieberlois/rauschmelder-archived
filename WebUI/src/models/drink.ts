export interface IDrink {
  id?: number;
  name?: string;
  drink?: string;
  timestamp?: string;
}

export interface IDrinkForUser {
  drink: string;
  amount: number;
}
