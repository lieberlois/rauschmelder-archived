import React, { useState, useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { AuthHeader } from "../../components/Header/AuthHeader";
import { useLoad } from "../../hooks/UseLoad";
import { Events } from "../../util/agent";
import { RouteComponentProps } from "react-router";
import { getEventId } from "../../util/localStorage";
import { availableDrinks } from "../../util/availableDrinks";
import { upperFirstLetter } from "../../util/stringUtils";
import { BarChart } from "../../components/Charts/BarChart";
import "./EventStatistik.scss";
import { IEventStats } from "../../models/event";

interface IProps extends RouteComponentProps { }

const EventStatistiken: React.FC<IProps> = (props) => {

  const reloadTimeInSeconds = 10;
  const amountLeaders = 5;
  const [isDirty, setIsDirty] = useState(true);
  const [event, , hasError] = useLoad<IEventStats | null>(async () => await Events.getLeaderboard(getEventId(), amountLeaders), null, isDirty, () => setIsDirty(false));

  useEffect(() => {
    setInterval(() => {
      setIsDirty(true)
    }, reloadTimeInSeconds * 1000)
  }, [])

  return (
    <IonPage>
      <AuthHeader title={"Event Leaderboard"} {...props} />

      <IonContent className="ion-padding">
        {

          <>
            {(hasError || event === null) ? (
              <>
                <h1>Statistiken konnten nicht geladen werden.</h1>
              </>
            ) : (
                <div className="chart-container">
                  {availableDrinks.sort((a, b) => a.localeCompare(b)).map(key => (
                    event[key].length > 0 && (
                      <div key={key} className="container">
                        <h1>{upperFirstLetter(key)}</h1>
                        <div className="chart-element" key={key} >
                          <BarChart data={event[key].map(elem => elem.amount)} labels={event[key].map(elem => elem.name)} />
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
          </>

        }
      </IonContent>

    </IonPage>
  );
};

export default EventStatistiken;