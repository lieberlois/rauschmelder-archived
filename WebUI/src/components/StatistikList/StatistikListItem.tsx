import { IonCard, IonCardContent } from "@ionic/react";
import React from "react";

interface IStatistikListItemProps {
  readonly drink: string,
  readonly amount: number
}

export function StatistikListItem({ drink, amount }: IStatistikListItemProps) {

  return (
    <IonCard className="ion-margin-bottom">
      <IonCardContent>
        <h1>{`${drink}: ${amount}`}</h1>
      </IonCardContent>
    </IonCard>
  );

}