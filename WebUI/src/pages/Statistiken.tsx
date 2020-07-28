import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonLoading } from "@ionic/react";
import { AuthHeader } from "../components/Header/AuthHeader";
import { StatistikList } from "../components/StatistikList/StatistikList";
import { useLoad } from "../hooks/UseLoad";
import { Drinks } from "../util/agent";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps { }

const Statistiken: React.FC<IProps> = (props) => {

  const [isDirty, setIsDirty] = useState(true);
  const [stats, isStatsLoading] = useLoad(async () => await Drinks.drinksForEvent(), [], isDirty, () => setIsDirty(false));

  useEffect(() => {
    console.log("called")
  }, [])

  return (
    <IonPage>
      <AuthHeader title={"Statistiken"} {...props} />

      <IonContent className="ion-padding">
        {
          isStatsLoading ? (
            <IonLoading message="Laden..." duration={0} isOpen={true} />
          ) : (
              <StatistikList eventStats={stats} />
            )
        }

      </IonContent>

    </IonPage>
  );
};

export default Statistiken;