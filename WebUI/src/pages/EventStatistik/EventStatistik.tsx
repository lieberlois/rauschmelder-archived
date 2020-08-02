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

interface IProps extends RouteComponentProps { }

const EventStatistiken: React.FC<IProps> = (props) => {

  const [event, isEventLoading, hasError] = useLoad(async () => await Events.get(getEventId()), {});

  return (
    <IonPage>
      <AuthHeader title={"Eventstatistik"} {...props} />

      <IonContent className="ion-padding">
        {
          isEventLoading ? (
            <IonLoading message="Laden..." duration={0} isOpen={true} />
          ) : (
              (hasError || event === {}) ? (
                <>
                  <h1>Statistiken konnten nicht geladen werden.</h1>
                </>
              ) : (
                  <>
                    {availableDrinks.sort((a, b) => a.localeCompare(b)).map(key => (
                      event[key].length > 0 && (
                        <>
                          <h1>{upperFirstLetter(key)}</h1>
                          <div className="chart-container" key={key}>
                            <BarChart data={event[key].map(elem => elem.amount)} labels={event[key].map(elem => elem.name)} />
                          </div>
                        </>
                      )
                    ))}
                  </>
                )
            )
        }

      </IonContent>

    </IonPage>
  );
};

export default EventStatistiken;