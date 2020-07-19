import { IonCard, IonCardContent, IonImg } from "@ionic/react";
import React from "react";

interface IDrinkCardProps {
  readonly drink: string;
  readonly handleCreateDrink: (drinkname: string) => void;

}

export function DrinkCard({ drink, handleCreateDrink }: IDrinkCardProps) {

  const handleClick = () => {
    handleCreateDrink(drink);
  }

  return (
    <IonCard className="ion-margin-bottom drink-card">

      <IonCardContent>
        <IonImg src={`/img/${drink}.jpg`} onClick={handleClick} />
      </IonCardContent>

    </IonCard>
  );
}