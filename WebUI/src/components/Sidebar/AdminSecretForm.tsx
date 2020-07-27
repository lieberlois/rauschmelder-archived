import React, { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";

interface IProps {
  readonly onSave: () => void
}

export function AdminSecretForm(props: IProps) {

  const [adminKey, setAdminKey] = useState("")

  const handleSend = () => {
    alert(adminKey);
  }

  return (
    <div className="admin-key">
      <IonItem lines="none">
        <IonLabel position="stacked">Administrationsschlüssel</IonLabel>
        <IonInput
          type="text"
          maxlength={255}
          value={adminKey}
          onIonChange={e => setAdminKey(e.detail.value!)}
          placeholder="Secret Key" required />
      </IonItem>


      <IonButton color="success" className="ion-margin-top" onClick={handleSend}>Senden</IonButton>
    </div>

    // Add a toast with success or not
  );
}