import { IonCard, IonCardContent, IonImg } from "@ionic/react";
import React from "react";
import "./StatistikListItem.scss";

interface IStatistikListItemProps {
  readonly drink: string,
  readonly amount: number
}

export function StatistikListItem({ drink, amount }: IStatistikListItemProps) {

  return (
    <IonCard className="card-container">
      <IonCardContent>
        <div className="icon-container">
          {[...Array(amount).keys()].map((i) => (
            <IonImg src={`/img/${drink}.jpg`} className="image" key={i} />
          ))}
        </div>
      </IonCardContent>
    </IonCard>
  );

}