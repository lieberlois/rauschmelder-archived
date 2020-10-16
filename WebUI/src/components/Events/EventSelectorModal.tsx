import React, { useState } from "react";
import {
  IonCard,
  IonHeader,
  IonLoading,
  IonButton,
  IonToast,
} from "@ionic/react";
import "./EventSelectorModal.scss"
import { Events } from "../../util/agent";
import { dateOptionsShort } from "../../util/dateOptions";
import { getEventId, setEventId } from "../../util/localStorage";
import useSWR from "swr";
import { IEvent } from "../../models/event";


interface IProps {
  closeModal: () => void;
  closeOnSelect?: boolean;
}

export function EventSelectorModal({ closeModal, closeOnSelect = true }: IProps) {

  const { data: events } = useSWR<IEvent[], Error>(
    `events`,
    async () => await Events.getCurrent(),
    { revalidateOnFocus: true }
  )

  const [currentEvent, setCurrentEvent] = useState<number>(getEventId());
  const [showToast, setShowToast] = useState(false);

  const handleSelectEvent = async (eventId: number) => {
    // event valid?
    setEventId(eventId);
    setCurrentEvent(eventId);
    setShowToast(true);
    if (closeOnSelect)
      closeModal();
  }

  return (
    <>
      <div className="event-selector ion-padding">
        <IonHeader>
          <IonCard>

            <div className="header-container">
              <h1>Event auswählen</h1>
              <IonButton className="close-modal" color="danger" onClick={() => closeModal()}>
                Schließen
              </IonButton>
            </div>
          </IonCard>
        </IonHeader>

        {!events ? <IonLoading message="Laden..." duration={0} isOpen={true} /> : (
          <div className="ion-padding">
            {events && events.length > 0 ? (
              events.map(event => (
                <IonCard className="ion-padding event-card" key={event.id} color={event.id === currentEvent ? "success" : ""}>
                  <div className="event-item-text">
                    <h2 className="event-title">{event.name}</h2>
                    <h4 className="event-header">
                      Beginn:
                    </h4>
                    <h5 className="event-date">{new Date(Date.parse(event.start_date!)).toLocaleDateString("de-DE", dateOptionsShort)}</h5>
                    <h4 className="event-header">
                      Ende:
                    </h4>
                    <h5 className="event-date">{new Date(Date.parse(event.end_date!)).toLocaleDateString("de-DE", dateOptionsShort)}</h5>
                  </div>
                  {event.id !== currentEvent && (
                    <IonButton
                      className="event-button"
                      color="success"
                      onClick={() => handleSelectEvent(event.id!)}
                    >
                      Wählen
                    </IonButton>
                  )}
                </IonCard>
              ))
            ) : (
                <IonCard>
                  <h2>Aktuell keine Events vorhanden.</h2>
                </IonCard>
              )}
          </div>
        )}


      </div>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={"Party ausgewählt"}
        color={"success"}
        duration={1000}
      />
    </>
  );
}