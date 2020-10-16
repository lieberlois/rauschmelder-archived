import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { AuthHeader } from "../../components/Header/AuthHeader";
import { Events } from "../../util/agent";
import { RouteComponentProps } from "react-router";
import { getEventId } from "../../util/localStorage";
import { availableDrinks } from "../../util/availableDrinks";
import { upperFirstLetter } from "../../util/stringUtils";
import { BarChart } from "../../components/Charts/BarChart";
import "./EventStatistik.scss";
import { IEventStats } from "../../models/event";
import useSWR from "swr";

interface IProps extends RouteComponentProps { }

const EventStatistiken: React.FC<IProps> = (props) => {

  const reloadTimeInSeconds = 5;
  const amountLeaders = 5;

  const { data: event, error } = useSWR<IEventStats, Error>(
    `leaderboard`,
    async () => await Events.getLeaderboard(getEventId(), amountLeaders),
    { refreshInterval: reloadTimeInSeconds }
  )

  return (
    <IonPage>
      <AuthHeader title={"Event Leaderboard"} {...props} />

      <IonContent className="ion-padding">
        {

          <>
            {(error || !event) ? (
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