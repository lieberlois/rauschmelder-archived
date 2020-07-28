import React, { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { Admin, Auth } from "../../util/agent";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";

interface IProps {
  closeModal: (success?: boolean) => void
}

export function AdminSecretForm({ closeModal }: IProps) {

  const [adminKey, setAdminKey] = useState("")
  const { setCurrentUser } = useCurrentUser();

  const handleSend = async () => {
    try {
      await Admin.acquireAdminStatus(adminKey);
      const user = await Auth.me();
      setCurrentUser(user);
      closeModal(true);
    } catch {
      closeModal(false);
    }
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

      <div className="buttons">
        <IonButton color="danger" className="ion-margin-top" onClick={() => closeModal()}>Abbrechen</IonButton>
        <IonButton color="success" className="ion-margin-top" onClick={handleSend}>Senden</IonButton>
      </div>
    </div>

    // Add a toast with success or not
  );
}