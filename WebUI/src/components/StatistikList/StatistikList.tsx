import React from "react";
import { IDrinksForEvent } from "../../models/drink";
import { StatistikListItem } from "./StatistikListItem";

interface IProps {
  readonly eventStats: IDrinksForEvent[];
}

export function StatistikList({ eventStats }: IProps) {

  return (
    <>
      {eventStats && eventStats.map((eventStat: IDrinksForEvent) => (
        <>
          <h1>{eventStat.event_name}</h1>
          {eventStat.drinks.sort((a, b) => a.drink.localeCompare(b.drink)).map((drinkStat) => (
            <StatistikListItem drink={drinkStat.drink} amount={drinkStat.amount} key={drinkStat.drink} />
          ))}
        </>
      ))}
    </>
  );

}