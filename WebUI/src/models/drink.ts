export interface IDrink {
  id?: number;
  name?: string;
  drink?: string;
  timestamp?: string;
  event_id?: number;
}

export interface IDrinkForUser {
  drink: string;
  amount: number;
}
