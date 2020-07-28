import React from "react";
import { IDrinksForEvent } from "../../models/drink";
import { StatistikListItem } from "./StatistikListItem";
import { IonText } from "@ionic/react";
import "./StatistikList.scss";

interface IProps {
  readonly eventStats: IDrinksForEvent[];
}

export function StatistikList({ eventStats }: IProps) {

  return (
    <>
      {eventStats && eventStats.length > 0 ? (
        eventStats.map((eventStat: IDrinksForEvent) => (
          <div key={eventStat.event_id}>
            <h1>{eventStat.event_name}</h1>
            {eventStat.drinks.sort((a, b) => a.drink.localeCompare(b.drink)).map((drinkStat) => (
              <StatistikListItem drink={drinkStat.drink} amount={drinkStat.amount} key={drinkStat.drink} />
            ))}
          </div>
        ))
      ) : (
          <div className="no-stats">
            <IonText>Noch keine Statistiken berechenbar.</IonText>
            <IonText>Du musst mehr trinken!</IonText>
          </div>
        )}
    </>
  );

}