import { IonHeader } from "@ionic/react";
import React from "react";

interface IHeaderProps {
  readonly title: string
}

export function Header({ title }: IHeaderProps) {

  return (
    <IonHeader className="ion-padding-horizontal" style={{ textAlign: "center" }}>
      <h1>{title}</h1>
    </IonHeader >
  );
}
