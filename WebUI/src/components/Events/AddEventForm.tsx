import React, { useState } from "react";
import { IonItem, IonLabel, IonInput, IonDatetime, IonButton, IonCard } from "@ionic/react";
import { Events } from "../../util/agent";
import { IEvent } from "../../models/event";
import "./AddEventForm.scss";

interface IProps {
  onCreate: (success: boolean) => void;
}

export function AddEventForm({ onCreate }: IProps) {
  const dayInSeconds = (1000 * 60 * 60 * 24);
  const currentDate = new Date();
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState<string>(currentDate.toISOString())
  const [endDate, setEndDate] = useState<string>(new Date(currentDate.getTime() + (1000 * 60 * 60 * 24)).toISOString())

  const handleSave = async () => {
    try {
      const event: IEvent = { name: name, start_date: startDate, end_date: endDate }
      await Events.create(event)
      resetForm();
      onCreate(true);
    } catch {
      onCreate(false);
    }
  }

  const resetForm = () => {
    setName("");
    setStartDate(currentDate.toISOString())
    setEndDate(new Date(currentDate.getTime() + dayInSeconds).toISOString());
  }

  const formValid = (name.trim().length > 0) && new Date(startDate) < new Date(endDate);

  return (
    <>
      <h1>Event hinzufügen</h1>
      <IonCard>

        <div className="form-fields">
          <IonItem lines="none">
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              type="text"
              maxlength={255}
              value={name}
              onIonChange={e => setName(e.detail.value!)}
              placeholder="Wie soll das Event heißen?" required />
          </IonItem>

          <IonItem className="ion-margin-top" lines="none">
            <IonLabel position="stacked">Start</IonLabel>
            <IonDatetime
              displayFormat="MMM DD, YYYY HH:mm"
              onIonChange={e => setStartDate(e.detail.value!)}
              value={startDate}
            />
          </IonItem>
          <IonItem className="ion-margin-top" lines="none">
            <IonLabel position="stacked">Ende</IonLabel>
            <IonDatetime
              displayFormat="MMM DD, YYYY HH:mm"
              onIonChange={e => setEndDate(e.detail.value!)}
              min={startDate}
              value={endDate}
            />
          </IonItem>
          <IonButton color="success" className="ion-margin-top add-button" onClick={handleSave} disabled={!formValid} >Hinzufügen</IonButton>
        </div>
      </IonCard>
    </>
  )
}