import React, { useState } from "react";
import { IonPage, IonContent, IonLoading, IonToast, IonAlert } from "@ionic/react";
import { AuthHeader } from "../../../components/Header/AuthHeader";
import { RouteComponentProps } from "react-router";
import { Events } from "../../../util/agent"
import { EventList } from "../../../components/Events/EventList";
import "./EventsPage.scss";
import { AddEventForm } from "../../../components/Events/AddEventForm";
import useSWR, { trigger } from "swr";
import { IEvent } from "../../../models/event";

interface IProps extends RouteComponentProps { }

const EventsPage: React.FC<IProps> = (props) => {

	const { data: events } = useSWR<IEvent[], Error>(
		`events`,
		async () => await Events.list(),
		{ revalidateOnFocus: true }
	)

	const [showCreateToast, setShowCreateToast] = useState(false);
	const [createToastSuccess, setCreateToastSuccess] = useState(false);
	const [showDeleteToast, setShowDeleteToast] = useState(false);
	const [deleteToastSuccess, setDeleteToastSuccess] = useState(false);
	const [showConfirmDeleteAlert, setShowConfirmDeleteAlert] = useState(false);
	const [currentEvent, setCurrentEvent] = useState(-1)

	const onCreateEvent = (success: boolean) => {
		setCreateToastSuccess(success);
		setShowCreateToast(true);
		trigger("events");
	}

	const handleDelete = (eventId: number) => {
		setCurrentEvent(eventId);
		setShowConfirmDeleteAlert(true);
		trigger("events");
	}

	const deleteEvent = async () => {
		try {
			await Events.delete(currentEvent);
			setDeleteToastSuccess(true);
			setShowDeleteToast(true);
			trigger("events");
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
					!events ? (
						<IonLoading message="Laden..." duration={0} isOpen={true} />
					) : (
							<div className="ion-padding main">
								<div className="item events">
									<EventList title={"Zukünftige Events"} events={events.filter(e => new Date(e.start_date!) > new Date())} handleDelete={handleDelete} />
									<EventList title={"Aktuelle Events"} events={events.filter(e => new Date(e.start_date!) <= new Date() && new Date() <= new Date(e.end_date!))} handleDelete={handleDelete} />
									<EventList title={"Vergangene Events"} events={events.filter(e => new Date(e.end_date!) < new Date())} handleDelete={handleDelete} />
								</div>
								<div>
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