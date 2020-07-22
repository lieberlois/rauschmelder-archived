import { IonHeader, IonMenuButton, IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import React from "react";
import "./Header.scss";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps {
  readonly title: string
}

export function Header({ title }: IProps) {
  return (
    <>
      <IonHeader className="header">

        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>

      </IonHeader>
    </>
  );
}
