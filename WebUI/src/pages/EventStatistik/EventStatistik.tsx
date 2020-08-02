import React from "react";
import { IonPage, IonContent, IonLoading } from "@ionic/react";
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

  const [event, isEventLoading, hasError] = useLoad<IEventStats | null>(async () => await Events.get(getEventId()), null);

  return (
    <IonPage>
      <AuthHeader title={"Eventstatistik"} {...props} />

      <IonContent className="ion-padding">
        {
          isEventLoading ? (
            <IonLoading message="Laden..." duration={0} isOpen={true} />
          ) : (
              (hasError || event === null) ? (
                <>
                  <h1>Statistiken konnten nicht geladen werden.</h1>
                </>
              ) : (
                  <div className="ion-padding chart-container">
                    {availableDrinks.sort((a, b) => a.localeCompare(b)).map(key => (
                      event[key].length > 0 && (
                        <div key={key}>
                          <h1>{upperFirstLetter(key)}</h1>
                          <div className="chart-element" key={key}>
                            <BarChart data={event[key].map(elem => elem.amount)} labels={event[key].map(elem => elem.name)} />
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )
            )
        }

      </IonContent>

    </IonPage>
  );
};

export default EventStatistiken;