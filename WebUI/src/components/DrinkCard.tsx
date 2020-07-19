import { IonCard, IonCardContent, IonImg } from "@ionic/react";
import React from "react";

interface IDrinkCardProps {
  readonly drink: string
}

export function DrinkCard({ drink }: IDrinkCardProps) {

  const handleClick = () => {
    console.log(`${drink} clicked`)
  }

  return (
    <IonCard className="ion-margin-bottom drink-card">

      <IonCardContent>
        <IonImg src={`/img/${drink}.jpg`} onClick={handleClick} />
      </IonCardContent>

    </IonCard>
  );
}