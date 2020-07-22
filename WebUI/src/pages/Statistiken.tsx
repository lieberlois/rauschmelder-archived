import React from "react";
import { IonPage, IonContent, IonLoading } from "@ionic/react";
import { AuthHeader } from "../components/Header/AuthHeader";
import { StatistikList } from "../components/StatistikList/StatistikList";
import { useLoad } from "../hooks/UseLoad";
import Drinks from "../util/agent";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps { }

const Statistiken: React.FC<IProps> = (props) => {

  const [exams, isExamsLoading] = useLoad(async () => await Drinks.drinksForUser(), []);

  return (
    <IonPage>
      <AuthHeader title={"Statistiken"} {...props} />

      <IonContent className="ion-padding">
        {
          isExamsLoading ? (
            <IonLoading message="Laden..." duration={0} isOpen={true} />
          ) : (
              <StatistikList drinkStats={exams} />
            )
        }

      </IonContent>

    </IonPage>
  );
};

export default Statistiken;