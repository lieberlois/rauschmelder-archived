import React from "react";
import { IonPage, IonContent, IonLoading } from "@ionic/react";
import { AuthHeader } from "../components/Header/AuthHeader";
import { StatistikList } from "../components/StatistikList/StatistikList";
import { Drinks } from "../util/agent";
import { RouteComponentProps } from "react-router";
import { IDrinksForEvent } from "../models/drink";
import useSWR from "swr";

interface IProps extends RouteComponentProps { }

const Statistiken: React.FC<IProps> = (props) => {

  const { data: stats, error } = useSWR<IDrinksForEvent[], Error>(
    `stats`,
    async () => await Drinks.drinksForEvent(),
    { revalidateOnFocus: true }
  )

  if (error)
    return (
      <h1>Statistiken konnten nicht geladen werden.</h1>
    )

  return (
    <IonPage>
      <AuthHeader title={"Statistiken"} {...props} />

      <IonContent className="ion-padding">
        {
          stats ? (
            <StatistikList eventStats={stats} />
          ) : (
              <IonLoading message="Laden..." duration={0} isOpen={true} />
            )
        }

      </IonContent>

    </IonPage>
  );
};

export default Statistiken;