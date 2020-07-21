import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import { useCurrentUser } from "./CurrentUserProvider";
import { Auth } from "../util/agent";
import { useAsyncEffect } from "../hooks/UseAsyncEffect";
import { IonLoading } from "@ionic/react";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import Rauschmelder from "../pages/Rauschmelder/Rauschmelder";
import Statistiken from "../pages/Statistiken";

export function AuthRouting() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [authenticating, setAuthenticating] = useState(true);

  // try to authenticate with the backend on page reload once, if currentUser wasn't set it means we had a 401 and the saved token was invalid
  useAsyncEffect(async () => {
    setAuthenticating(true);
    try {
      const me = await Auth.me();
      setCurrentUser(me);
    } catch (e) { /* we can ignore the error here because it just means that either no token was saved or the token was invalid */ }
    setAuthenticating(false);
  }, []);

  return (
    authenticating
      ? <IonLoading message="Authentifizieren..." duration={0} isOpen={true} />
      : <>
        {
          !currentUser
            ? <>
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route render={() => <Redirect to="/login" />} />
            </>
            : <>
              <Route path="/stats" component={Statistiken} exact />
              <Route path="/" component={Rauschmelder} exact />
            </>
        }
      </>
  )
}