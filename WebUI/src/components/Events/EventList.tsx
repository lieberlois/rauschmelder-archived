import React from "react";
import { IEvent } from "../../models/event";
import { EventListItem } from "./EventListItem";
import "./EventList.scss";

interface IProps {
	readonly events: IEvent[];
	handleDelete: (eventId: number) => void;
	title: string;
}

export function EventList({ events, handleDelete, title }: IProps) {
	return (
		<>
			{events && events.length > 0 && (
				<div>
					<h1>{title}</h1>
					{events && events.length > 0 ? events.map(event => (
						<EventListItem event={event} handleDelete={handleDelete} key={event.id} />
					)) : (
							<h4>Aktuell keine Events vorhanden.</h4>
						)}
				</div>
			)}
		</>
	)
}