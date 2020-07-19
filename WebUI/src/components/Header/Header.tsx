import { IonHeader, IonMenuButton, IonIcon, IonToolbar, IonTitle, IonButtons, IonAlert } from "@ionic/react";
import React, { useState } from "react";
import "./Header.scss";
import { powerOutline } from "ionicons/icons";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";
import { deleteBearerToken } from "../../util/auth";
import { useHistory } from "react-router-dom";

interface IHeaderProps {
  readonly title: string
}

export function Header({ title }: IHeaderProps) {

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const history = useHistory();
  const { setCurrentUser } = useCurrentUser();

  const logout = () => {
    setCurrentUser(null);
    deleteBearerToken();
    history.push("/login");
  }

  return (
    <>
      <IonHeader className="header">

        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={powerOutline} className="icon-style" onClick={() => setShowConfirmAlert(true)} />
          </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => setShowConfirmAlert(false)}
        message={`Wirklich ausloggen?`}
        header={'Logout'}
        cssClass={"confirm-alert"}
        buttons={[
          {
            text: 'Abbrechen',
            cssClass: 'cancel-button',
            handler: () => {

            }
          },
          {
            text: 'Ja',
            cssClass: 'confirm-button',
            handler: () => {
              logout();
            }
          }
        ]}
      />
    </>
  );
}
