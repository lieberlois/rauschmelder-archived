export interface IDrink {
  id?: number;
  name?: string;
  drink?: string;
  timestamp?: string;
  event_id?: number;
}

export interface IDrinksForEvent {
  event_id: number;
  event_name: string;
  start_date: string;
  drinks: IDrinkForUser[];
}

export interface IDrinkForUser {
  drink: string;
  amount: number;
}
