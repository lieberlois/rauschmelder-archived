import React from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonToolbar,
  IonMenuToggle,
} from "@ionic/react";
import {
  beerOutline,
  statsChartOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import "./Sidebar.scss";

export function Sidebar() {
  const history = useHistory();

  return (
    <>
      <IonMenu contentId="menu-anchor" className="menu">
        <IonHeader className="menu-header">
          <IonToolbar>
            <h1 className="ion-padding-horizontal">Rauschmelder</h1>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonMenuToggle>
            <IonList lines="none">
              <IonListHeader>
                <IonLabel>Allgemein</IonLabel>
              </IonListHeader>
              <IonItem button onClick={() => history.push("/")}>
                <IonIcon icon={beerOutline} />
                <IonLabel>Getränke</IonLabel>
              </IonItem>

              <IonListHeader className="ion-margin-top">
                <IonLabel>Statistiken</IonLabel>
              </IonListHeader>
              <IonItem button onClick={() => history.push("/stats")}>
                <IonIcon icon={statsChartOutline} />
                <IonLabel>Eigene Statistik</IonLabel>
              </IonItem>
            </IonList>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>

      <div id="menu-anchor" />
    </>
  );
}
