import React from "react";
import { IDrinkForUser } from "../../models/drink";
import { StatistikListItem } from "./StatistikListItem";

interface IStatistikListProps {
  readonly drinkStats: IDrinkForUser[];
}

export function StatistikList({ drinkStats }: IStatistikListProps) {

  return (
    <>
      {drinkStats.sort((a, b) => a.drink.localeCompare(b.drink)).map((drinkStat) => (
        <StatistikListItem drink={drinkStat.drink} amount={drinkStat.amount} key={drinkStat.drink} />
      ))}
    </>
  );

}