import React, { useState } from "react";
import {
  IonCard,
  IonHeader,
  IonLoading,
  IonButton,
  IonToast,
} from "@ionic/react";
import "./EventSelectorModal.scss"
import { useLoad } from "../../hooks/UseLoad";
import { Events } from "../../util/agent";
import { dateOptionsShort } from "../../util/dateOptions";
import { getEventId, setEventId } from "../../util/localStorage";


interface IProps {
  closeModal: () => void;
}

export function EventSelectorModal({ closeModal }: IProps) {

  const [events, isEventsLoading] = useLoad(async () => await Events.getCurrent(), []);
  const [currentEvent, setCurrentEvent] = useState<number>(getEventId());
  const [showToast, setShowToast] = useState(false);

  const handleSelectEvent = async (eventId: number) => {
    // event valid?
    setEventId(eventId);
    setCurrentEvent(eventId);
    setShowToast(true);
    closeModal();
  }

  return isEventsLoading ? (
    <IonLoading message="Laden..." duration={0} isOpen={true} />
  )
    :
    (
      <>
        <div className="event-selector ion-padding">
          <IonHeader>
            <h1>Event auswählen</h1>
          </IonHeader>

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
                <h2>Aktuell keine Events vorhanden.</h2>
              )}
          </div>
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