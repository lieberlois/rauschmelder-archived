import { IonCard, IonImg } from "@ionic/react";
import React from "react";
import "./DrinkCard.scss"

interface IDrinkCardProps {
  readonly drink: string;
  readonly handleCreateDrink: (drinkname: string) => void;
}

export function DrinkCard({ drink, handleCreateDrink }: IDrinkCardProps) {

  const handleClick = () => {
    handleCreateDrink(drink);
  }

  return (
    <IonCard className="drink-card">
      <IonImg src={`/img/${drink}.jpg`} onClick={handleClick} className="image" />
    </IonCard>
  );
}