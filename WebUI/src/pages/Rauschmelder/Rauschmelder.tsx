import { IonContent, IonPage, IonToast, IonAlert, IonModal, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { AuthHeader } from '../../components/Header/AuthHeader';
import "./Rauschmelder.scss";
import { Drinks, Events } from '../../util/agent';
import { DrinkCard } from '../../components/DrinkCard/DrinkCard';
import { availableDrinks } from '../../util/availableDrinks';
import { RouteComponentProps } from 'react-router';
import { EventSelectorModal } from '../../components/Events/EventSelectorModal';
import { getEventId, deleteEventId } from '../../util/localStorage';
import { useAsyncEffect } from '../../hooks/UseAsyncEffect';

interface IProps extends RouteComponentProps { }

const Rauschmelder: React.FC<IProps> = (props) => {

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<string>("");
  const [currentEvent] = useState<number>(getEventId())
  const [loading, setLoading] = useState(true);
  const [showSelectedEventToast, setShowSelectedEventToast] = useState(false);

  useAsyncEffect(async () => {
    if (currentEvent && currentEvent !== -1) {
      try {
        await Events.validateEvent(currentEvent)
      } catch {
        deleteEventId();
        setShowEventModal(true);
      }
    } else {
      deleteEventId();
      setShowEventModal(true);
    }
    setLoading(false)
  }, [])

  const createDrink = async (drink: string) => {
    try {
      await Drinks.create({
        drink: drink,
        event_id: getEventId()
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

  const onCloseEventSelector = () => {
    setShowSelectedEventToast(true);
    setShowEventModal(false);
  }

  return (
    <IonPage>
      {loading ? (
        <IonLoading message="Laden..." duration={0} isOpen={true} />
      ) : (
          <>
            <AuthHeader title={"Rauschmelder"} {...props} />

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
              duration={1000}
            />

            <IonToast
              isOpen={showErrorToast}
              onDidDismiss={() => setShowErrorToast(false)}
              message="Fehler beim Speichern!"
              color="danger"
              duration={1000}
            />

            <IonToast
              isOpen={showSelectedEventToast}
              onDidDismiss={() => setShowSelectedEventToast(false)}
              message={"Viel Spaß beim Saufen!"}
              color={"success"}
              duration={1000}
            />

            <IonModal isOpen={showEventModal} backdropDismiss={false} onDidDismiss={() => setShowEventModal(false)}>
                <EventSelectorModal closeModal={onCloseEventSelector} />
            </IonModal>
          </>
        )
      }


    </IonPage>
  );
};

export default Rauschmelder;
