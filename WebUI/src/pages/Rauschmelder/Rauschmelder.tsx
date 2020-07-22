import { IonContent, IonPage, IonToast, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { Header } from '../../components/Header/Header';
import "./Rauschmelder.scss";
import Drinks from '../../util/agent';
import { DrinkCard } from '../../components/DrinkCard/DrinkCard';
import { availableDrinks } from '../../util/availableDrinks';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps { }

const Rauschmelder: React.FC<IProps> = (props) => {

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<string>("");

  const createDrink = async (drink: string) => {
    try {
      await Drinks.create({
        drink: drink,
        name: "Example Name"
      })
      setShowSuccessToast(true);
    } catch (error) {
      setShowErrorToast(true);
    }
  }

  const handleCreateDrink = (drink: string) => {
    setCurrentDrink(drink);
    setShowConfirmAlert(true);
  }

  return (
    <IonPage>
      <Header title={"Rauschmelder"} {...props} />

      <IonContent>
        <div className="drink-container">
          {availableDrinks.map(drink => (
            <DrinkCard drink={drink} handleCreateDrink={handleCreateDrink} key={drink} />
          ))}
        </div>
      </IonContent>

      <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => setShowConfirmAlert(false)}
        message={`${currentDrink.charAt(0).toUpperCase() + currentDrink.slice(1)} saufen?`}
        header={'Bestätigung'}
        cssClass={"confirm-alert"}
        buttons={[
          {
            text: 'Abbrechen',
            cssClass: 'cancel-button',
            handler: () => {
              setCurrentDrink("");
            }
          },
          {
            text: 'Bestätigen',
            cssClass: 'confirm-button',
            handler: () => {
              createDrink(currentDrink);
            }
          }
        ]}
      />

      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        message="Erfolgreich gesoffen!"
        color="success"
        duration={500}
      />

      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={() => setShowErrorToast(false)}
        message="Fehler beim Speichern!"
        color="danger"
        duration={500}
      />


    </IonPage>
  );
};

export default Rauschmelder;
