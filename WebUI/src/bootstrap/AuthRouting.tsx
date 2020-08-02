import React, { useState } from "react";
import { Route, Redirect, RouteComponentProps, withRouter } from "react-router";
import { useCurrentUser } from "./CurrentUserProvider";
import { Auth } from "../util/agent";
import { useAsyncEffect } from "../hooks/UseAsyncEffect";
import { IonLoading } from "@ionic/react";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import Rauschmelder from "../pages/Rauschmelder/Rauschmelder";
import Statistiken from "../pages/Statistiken";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Switch } from "react-router-dom"
import EventsPage from "../pages/AdminArea/EventsPage/EventsPage";
import EventStatistiken from "../pages/EventStatistik/EventStatistik";

interface IProps extends RouteComponentProps { }

const AuthRouting: React.FC<IProps> = (props: IProps) => {
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
            ?

              <Switch>
              { /* 
                Ideally this would be a IonRouterOutlet. Problem is: The IonRouterOutlet
                loads pages without refreshing their props hence not refreshing essential data,
                which was a huge problem in the stats page. 

                After a bit of research it appears that this is a bug in Ionic.
              */ }
                <Route path="/login" render={() => { return <Login {...props} /> }} exact />
                <Route path="/register" render={() => { return <Register {...props} /> }} exact />
                <Route path="/" render={() => <Redirect to="/login" />} />
              </Switch>


            :
            <>
              <Sidebar user={currentUser} {...props} />


                <Switch>
                  <Route path="/stats" render={() => { return <Statistiken {...props} /> }} exact />
                  <Route path="/eventstats" render={() => { return <EventStatistiken {...props} /> }} exact />
                  {currentUser.isadmin && <Route path="/events" render={() => { return <EventsPage {...props} /> }} exact />}
                  <Route path="/" render={() => { return <Rauschmelder {...props} /> }} exact />
                  <Route render={() => <Redirect to="/" />} />
                </Switch>
            </>

        }
      </>
  )
}

export default withRouter(AuthRouting);