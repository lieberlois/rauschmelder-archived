import { IonHeader, IonMenuButton } from "@ionic/react";
import React from "react";
import "./Header.scss";

interface IHeaderProps {
  readonly title: string
}

export function Header({ title }: IHeaderProps) {

  return (
    <IonHeader className="ion-padding-horizontal">
      <div className="header">
        <IonMenuButton className="ion-margin-end" />
        <h1>{title}</h1>
      </div>
    </IonHeader >
  );
}
