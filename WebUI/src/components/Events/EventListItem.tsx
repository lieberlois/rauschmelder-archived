import React from "react";
import { IEvent } from "../../models/event";
import { IonCard, IonButton } from "@ionic/react";
import { dateOptions } from "../../util/dateOptions";
import "./EventListItem.scss";

interface IProps {
  readonly event: IEvent;
  handleDelete: (eventId: number) => void;
}

export function EventListItem({ event, handleDelete }: IProps) {
  return (
    <IonCard className="ion-padding event-card">
      <div className="event-item-text">
        <h2 className="event-title">{event.name}</h2>
        <h4 className="event-header">
          Beginn:
                </h4>
        <h5 className="event-date">{new Date(Date.parse(event.start_date!)).toLocaleDateString("de-DE", dateOptions)}</h5>
        <h4 className="event-header">
          Ende:
                </h4>
        <h5 className="event-date">{new Date(Date.parse(event.end_date!)).toLocaleDateString("de-DE", dateOptions)}</h5>
        {new Date(event.start_date!) > new Date() && (
          <IonButton
            className="delete-button"
            color="danger"
            onClick={() => handleDelete(event.id!)}
          >
            Löschen
          </IonButton>
        )}
      </div>
    </IonCard>
  )
}