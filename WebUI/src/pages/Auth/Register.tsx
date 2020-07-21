import { useState } from "react";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";
import { useHistory, Link } from "react-router-dom";
import React from "react";
import { IonPage, IonLoading, IonContent, IonInput, IonButton, IonToast } from "@ionic/react";
import { Header } from "../../components/Header/Header";
import { Auth } from "../../util/agent";
import { setBearerToken } from "../../util/auth";

export function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("Fehler beim Registrieren");


  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const history = useHistory();

  const showError = (message?: string) => {
    const oldMsg = errorMessage;
    if (message) {
      setErrorMessage(message)
    }
    setShowErrorToast(true);
    setErrorMessage(oldMsg);
  }

  const onSubmit = async () => {
    if (password !== cpassword) {
      showError("Passwörter stimmen nicht überein")
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.register({ username: username, password: password });
      setBearerToken(response.access_token);
      const user = await Auth.me();
      setCurrentUser(user);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setShowErrorToast(true);
      setLoading(false);
    }
  }

  return (
    <>
      <IonPage className="register-form">
        <Header title={"Registrieren"} />
        <IonLoading message="Account erstellen..." duration={0} isOpen={loading} />
        <IonContent>
          <div className="ion-padding container">
            <IonInput
              placeholder="Nutzername"
              onIonChange={(e: any) => setUsername(e.target.value)}
              color="dark"
            />
            <IonInput
              type="password"
              placeholder="Passwort"
              onIonChange={(e: any) => setPassword(e.target.value)}
              color="dark"
            />
            <IonInput
              type="password"
              placeholder="Passwort bestätigen"
              onIonChange={(e: any) => setCpassword(e.target.value)}
              color="dark"
            />
            <IonButton onClick={() => onSubmit()} expand="block">Registrieren</IonButton>
            <p className="ion-text-center">
              Bereits einen Account erstellt? <Link to="/login">Einloggen</Link>
            </p>
          </div>

          <IonToast
            isOpen={showErrorToast}
            onDidDismiss={() => setShowErrorToast(false)}
            message={errorMessage}
            color="danger"
            duration={500}
          />
        </IonContent>
      </IonPage>
    </>
  )
}