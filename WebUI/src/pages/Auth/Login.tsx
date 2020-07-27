import { useState } from "react";
import React from "react";
import { IonPage, IonLoading, IonContent, IonInput, IonButton, IonToast } from "@ionic/react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./Auth.scss";
import { Auth } from "../../util/agent";
import { setBearerToken } from "../../util/auth";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";

interface IProps extends RouteComponentProps { }

// TODO: We should add better error handling (axios response codes!)

export const Login: React.FC<IProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { history } = props;

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await Auth.login(username, password);
      setBearerToken(response.access_token);
      const user = await Auth.me();
      setCurrentUser(user);
      setLoading(false);
      history.push("/")
    } catch (error) {
      console.log(error)
      setShowErrorToast(true);
      setLoading(false);
    }
  }

  return (

    <IonPage className="register-form">
      <Header title={"Login"} {...props} />
      <IonLoading message="Einloggen..." duration={0} isOpen={loading} />
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
          <IonButton onClick={() => onSubmit()} expand="block">Login</IonButton>
          <p className="ion-text-center">
            Noch keinen Account erstellt? <Link to="/register">Registrieren</Link>
          </p>
        </div>

        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Fehler beim Login"
          color="danger"
          duration={500}
        />
      </IonContent>
    </IonPage>
  )
}