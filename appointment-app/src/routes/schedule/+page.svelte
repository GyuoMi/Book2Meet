<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';

	/** @type {import('./$types').PageServerLoad} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	let ec;
	let eventSelected;
	let plugins = [TimeGrid, Interaction];
	let options = {
		view: 'timeGridWeek',
		allDaySlot: false,
		pointer: true,
		selectable: true,
		unselectAuto: true,
		nowIndicator: true,
		height: '800px',
		headerToolbar: { start: 'prev,next today', center: 'title', end: '' },
		select: createEventWithPointer,
		eventClick: getCurrentEventClicked,
		events: getArrayOfEventsFromDatabase(),
	};
	function formatEventObject(event) {
		const eventObj = {
			start: event.EVENT_START,
			end: event.EVENT_END,
			title: event.EVENT_TITLE,
			color: event.EVENT_COLOR
		};
		return eventObj;
	}
	function createEventWithPointer(event) {
		ec.addEvent({
			start: event.start,
			end: event.end,
			title: 'Availiable for Appointment',
			color: getRandomHexColor()
		});
	}
	function getCurrentEventClicked(info) {
		eventSelected = info;
	}

	function deleteEventFromCalender() {
		console.log(eventSelected);
		ec.removeEventById(eventSelected.event.id);
	}

	function getArrayOfEventsFromDatabase() {
		let eventsJson = data.post.results;
		let eventObjects = [];
		for (let i = 0; i < eventsJson.length; i++) {
			eventObjects.push(formatEventObject(eventsJson[i]));
		}
		return eventObjects;
	}

	let allEvents;

	function returnAllEventsFromCaledar() {
		let eventsFromCalendar = ec.getEvents();
		let updatedEventsFromcalendar = [];
		//TEMPORARY FIX PLEASE!!!!!!!!!!!!!!
		for(let i = 0; i<eventsFromCalendar.length; i++){
			let event = eventsFromCalendar[i];
			event.start.setHours(event.start.getHours()+2);
			event.end.setHours(event.end.getHours() +2);

			updatedEventsFromcalendar.push(event);
		}
		allEvents = JSON.stringify(updatedEventsFromcalendar);
		
	}

	//setInterval(saveAllEventsIntoDatabase,1000);
	function getRandomHexColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}
	function _pad(num) {
		let norm = Math.floor(Math.abs(num));
		return (norm < 10 ? '0' : '') + norm;
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />

<div class="flex flex-col items-center ">
	<button on:click={deleteEventFromCalender} class="btn btn-primary place-item-center"
		>Delete Event</button
	>
</div>

<form method="POST" action="?/saveDatabaseEvents">
	<div class="flex flex-col items-center py-1">
		<input type="hidden" name="eventArray" bind:value={allEvents} />
		<button on:click={returnAllEventsFromCaledar} class="btn btn-secondary place-item-center"
			>Save Events</button
		>
	</div>
</form>
