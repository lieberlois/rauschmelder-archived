import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonLoading, IonToast, IonAlert } from "@ionic/react";
import { AuthHeader } from "../../../components/Header/AuthHeader";
import { useLoad } from "../../../hooks/UseLoad";
import { RouteComponentProps } from "react-router";
import { Events } from "../../../util/agent"
import { EventList } from "../../../components/Events/EventList";
import "./EventsPage.scss";
import { AddEventForm } from "../../../components/Events/AddEventForm";

interface IProps extends RouteComponentProps { }

const EventsPage: React.FC<IProps> = (props) => {

	const [isDirty, setIsDirty] = useState(true);
	const [events, isEventsLoading] = useLoad(async () => await Events.list(), [], isDirty, () => setIsDirty(false));
	const [showCreateToast, setShowCreateToast] = useState(false);
	const [createToastSuccess, setCreateToastSuccess] = useState(false);
	const [showDeleteToast, setShowDeleteToast] = useState(false);
	const [deleteToastSuccess, setDeleteToastSuccess] = useState(false);
	const [showConfirmDeleteAlert, setShowConfirmDeleteAlert] = useState(false);
	const [currentEvent, setCurrentEvent] = useState(-1)

	const onCreateEvent = (success: boolean) => {
		setCreateToastSuccess(success);
		setShowCreateToast(true);
		setIsDirty(true);
	}

	const handleDelete = (eventId: number) => {
		setCurrentEvent(eventId);
		setShowConfirmDeleteAlert(true);
	}

	const deleteEvent = async () => {
		try {
			await Events.delete(currentEvent);
			setDeleteToastSuccess(true);
			setShowDeleteToast(true);
			setIsDirty(true);
		} catch {
			setDeleteToastSuccess(false);
			setShowDeleteToast(true);
		} finally {
			setCurrentEvent(-1);
		}
	}

	return (
		<IonPage>
			<AuthHeader title={"Events"} {...props} />

			<IonContent className="ion-padding">
				{
					isEventsLoading ? (
						<IonLoading message="Laden..." duration={0} isOpen={true} />
					) : (
							<div className="ion-padding main">
								<div className="item">
									<h3>Bestehende Events</h3>
									<EventList events={events} handleDelete={handleDelete} />
								</div>
								<div className="item">
									<h3>Event hinzufügen</h3>
									<AddEventForm onCreate={onCreateEvent} />
								</div>
							</div>
						)
				}

				<IonToast
					isOpen={showCreateToast}
					onDidDismiss={() => setShowCreateToast(false)}
					message={createToastSuccess ? "Event erstellt!" : "Fehler beim Erstellen!"}
					color={createToastSuccess ? "success" : "danger"}
					duration={1000}
				/>

				<IonToast
					isOpen={showDeleteToast}
					onDidDismiss={() => setShowDeleteToast(false)}
					message={deleteToastSuccess ? "Event gelöscht!" : "Fehler beim Löschen!"}
					color={deleteToastSuccess ? "success" : "danger"}
					duration={1000}
				/>

				<IonAlert
					isOpen={showConfirmDeleteAlert}
					onDidDismiss={() => setShowConfirmDeleteAlert(false)}
					message={`Wirklich löschen?`}
					header={'Bestätigen'}
					cssClass={"confirm-alert"}
					buttons={[
						{
							text: 'Abbrechen',
							cssClass: 'cancel-button',
							handler: () => {

							}
						},
						{
							text: 'Ja',
							cssClass: 'confirm-button',
							handler: () => {
								deleteEvent();
							}
						}
					]}
				/>

			</IonContent>

		</IonPage>
	);
};

export default EventsPage;