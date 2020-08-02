import { useState } from "react";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";
import { Link, RouteComponentProps } from "react-router-dom";
import React from "react";
import { IonPage, IonLoading, IonContent, IonInput, IonButton, IonToast } from "@ionic/react";
import { Header } from "../../components/Header/Header";
import { Auth } from "../../util/agent";
import { setBearerToken } from "../../util/localStorage";

interface IProps extends RouteComponentProps { }

const maxUserChars = 15;

export const Register: React.FC<IProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("Fehler beim Registrieren");
  const { history } = props;


  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const [showErrorToast, setShowErrorToast] = useState(false);

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

  const formValid = (username.trim().length > 0) && (username.trim().length <= maxUserChars) && password.trim().length > 0 && password === cpassword;

  return (
    <IonPage className="register-form">
      <Header title={"Registrieren"} {...props} />
      <IonLoading message="Account erstellen..." duration={0} isOpen={loading} />
      <IonContent>
        <div className="ion-padding container">
          <IonInput
            placeholder={`Nutzername (max. ${maxUserChars} Buchstaben)`}
            onIonChange={(e: any) => setUsername(e.target.value)}
            color="dark"
          />
          {username.trim().length > maxUserChars && <p className="error">Nutzername darf max. {maxUserChars} Zeichen lang sein!</p>}
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
          {password.trim().length > 0 && cpassword.trim().length > 0 && password !== cpassword && <p className="error">Passwörter stimmen nicht überein!</p>}
          <IonButton onClick={() => onSubmit()} disabled={!formValid} expand="block">Registrieren</IonButton>
          <p className="ion-text-center">
            Bereits einen Account erstellt? <Link to="/login">Einloggen</Link>
          </p>
        </div>

        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message={errorMessage}
          color="danger"
          duration={1000}
        />
      </IonContent>
    </IonPage >
  )
}