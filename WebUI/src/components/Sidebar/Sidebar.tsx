import React, { useState } from "react";
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
  IonModal
} from "@ionic/react";
import {
  beerOutline,
  statsChartOutline,
  settingsOutline,
  helpCircleOutline,
} from "ionicons/icons";
import "./Sidebar.scss";
import { RouteComponentProps } from "react-router-dom";
import { IUser } from "../../models/user";
import { AdminSecretForm } from "./AdminSecretForm";

interface IProps extends RouteComponentProps {
  user: IUser;
}

export const Sidebar: React.FC<IProps> = ({ history, user }) => {

  const [showModal, setShowModal] = useState(false);

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

              {user.isadmin ? (
                <>
                  <IonListHeader className="ion-margin-top">
                    <IonLabel>Administration</IonLabel>
                  </IonListHeader>
                  <IonItem button onClick={() => alert("TODO")}>
                    <IonIcon icon={settingsOutline} />
                    <IonLabel>Events</IonLabel>
                  </IonItem>
                </>
              ) : (
                  <>
                    <IonItem button onClick={() => setShowModal(true)}>
                      <IonIcon icon={helpCircleOutline} />
                      <IonLabel>Admin werden</IonLabel>
                    </IonItem>
                  </>
                )}
            </IonList>
          </IonMenuToggle>
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} >
            <div className="ion-padding">
              <AdminSecretForm onSave={() => {
                setShowModal(false);
              }} />
            </div>
          </IonModal>
        </IonContent>
      </IonMenu>

      <div id="menu-anchor" />
    </>
  );
}
