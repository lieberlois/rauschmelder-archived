import { IonHeader, IonMenuButton, IonIcon, IonToolbar, IonTitle, IonButtons, IonAlert, IonPopover, IonList, IonItem, IonModal } from "@ionic/react";
import React, { useState, SyntheticEvent } from "react";
import "./Header.scss";
import { powerOutline, settingsOutline, searchOutline } from "ionicons/icons";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";
import { deleteBearerToken } from "../../util/localStorage";
import { RouteComponentProps } from "react-router-dom";
import { EventSelectorModal } from "../Events/EventSelectorModal";

interface IProps extends RouteComponentProps {
  readonly title: string
}

interface IShowPopover {
  readonly show: boolean,
  readonly event?: SyntheticEvent
}


export function AuthHeader({ history, title }: IProps) {

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showPopover, setShowPopover] = useState<IShowPopover>({ show: false });
  const [showEventModal, setShowEventModal] = useState(false);

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
            <IonIcon
              icon={settingsOutline}
              className="icon-style"
              // onClick=
              onClick={e => {
                e.persist();
                setShowPopover({ show: true, event: e });
              }}
            />
          </IonButtons>

        </IonToolbar>

        <IonPopover
          isOpen={showPopover.show}
          event={showPopover.event?.nativeEvent}
          onDidDismiss={() => setShowPopover({ show: false, event: undefined })}>
          <IonList lines="none">
            <IonItem onClick={() => {
              setShowEventModal(true);
              setShowPopover({ show: false, event: undefined });
            }} button>
              <IonIcon
                className="menu-item"
                icon={searchOutline}
              />
              Partyauswahl
            </IonItem>
            <IonItem onClick={() => {
              setShowConfirmAlert(true);
              setShowPopover({ show: false, event: undefined });
            }} button>
              <IonIcon
                className="menu-item"
                icon={powerOutline}
              />
              Logout
            </IonItem>
          </IonList>
        </IonPopover>


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
      <IonModal isOpen={showEventModal} onDidDismiss={() => setShowEventModal(false)}>
        <EventSelectorModal closeModal={() => { }} />
      </IonModal>
    </>
  );
}
