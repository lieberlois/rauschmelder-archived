import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { Header } from '../components/Header';
import { DrinkCard } from '../components/DrinkCard';
import "./Rauschmelder.scss";

const Page: React.FC = () => {

  return (
    <IonPage>
      <Header title={"Rauschmelder"} />

      <IonContent>
        <div className="drink-container">
          <DrinkCard drink={"goiss"} />
          <DrinkCard drink={"weizen"} />
          <DrinkCard drink={"cocktail"} />
          <DrinkCard drink={"shot"} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
