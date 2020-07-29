import React from "react";
import { IDrinksForEvent } from "../../models/drink";
import { StatistikListItem } from "./StatistikListItem";
import { IonText } from "@ionic/react";
import "./StatistikList.scss";
import { dateOptionsNoTime } from "../../util/dateOptions";

interface IProps {
  readonly eventStats: IDrinksForEvent[];
}

export function StatistikList({ eventStats }: IProps) {

  return (
    <>
      {eventStats && eventStats.length > 0 ? (
        eventStats
          .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
          .map((eventStat: IDrinksForEvent) => (
            <div key={eventStat.event_id} className="event-stat">
              <h1>{eventStat.event_name}</h1>
              <h3>{new Date(eventStat.start_date).toLocaleDateString("de-DE", dateOptionsNoTime)}</h3>
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