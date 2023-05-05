<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';
	import {
		getAllEventsFromCalendarAsJson,
		deleteEventFromCalender,
		getRandomHexColor,
		getArrayOfEventsFromDatabase
	} from './page.modules.js';
	/*Documentation of the underlying calendar library can be found at https://github.com/vkurko/calendar. Comments below describe how it was implemented into the project.*/

	/** @type {import('./$types').PageServerLoad} */
	export let data;

	//ec is an object that is bound to the calendar that allows us to calls functions provided by the calendar library.
	let ec;
	let currentEventSelected;
	let allEvents;

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

		/*takes in a callback function and passes in the event object that is clicked*/
		select: createEventWithPointer,
		eventClick: getCurrentEventClicked,

		/*events takes in an array of event objects and add them to the calendar*/
		events: getArrayOfEventsFromDatabase(data)
	};

	/*callback function which is sent to the schedule library. When a selection is made on the calendar, they don't show events on the calendar but just return the event object containing the details of the selection. select calls the createEventWithPointer function passing in the event object, which we then add to the caledar.*/

	export function createEventWithPointer(event) {
		ec.addEvent({
			start: event.start,
			end: event.end,
			title: 'Availiable for Appointment',
			color: getRandomHexColor()
		});
	}

	/*purpose is to save the last clicked event so user can press the delete button if necessary. Deleting the last item clicked.*/
	function getCurrentEventClicked(event) {
		currentEventSelected = event;
	}

	function setVariableToJsonStringOfEvents(ec) {
		allEvents = getAllEventsFromCalendarAsJson(ec);
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />

<!--Delete button-->
<div class="flex flex-col items-center">
	<button
		on:click={deleteEventFromCalender(ec, currentEventSelected)}
		class="btn btn-primary place-item-center">Delete Event</button
	>
</div>

<!--makes up the Save Events button, form used to send all events currently on the calendar to the backend to be saved into the calendar.-->
<form method="POST" action="?/saveDatabaseEvents">
	<div class="flex flex-col items-center py-1">
		<input type="hidden" name="eventArray" bind:value={allEvents} />
		<button
			on:click={setVariableToJsonStringOfEvents(ec)}
			class="btn btn-secondary place-item-center">Save Events</button
		>
	</div>
</form>
