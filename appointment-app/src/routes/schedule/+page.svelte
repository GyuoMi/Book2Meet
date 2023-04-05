<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';

	/*Documentation of the underlying calendar library can be found at https://github.com/vkurko/calendar. Comments below describe how it was implemented into the project.*/

	/** @type {import('./$types').PageServerLoad} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

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
		events: getArrayOfEventsFromDatabase()
	};

	/*the key values for the event objects returned from the database.js file uses the database naming format for the keys which is all caps, the scheduling library that we're can only read key values in a certain format. So we have to add a conversion.*/
	function formatEventObject(event) {
		const eventObj = {
			start: event.EVENT_START,
			end: event.EVENT_END,
			title: event.EVENT_TITLE,
			color: event.EVENT_COLOR
		};
		return eventObj;
	}

	/*callback function which is sent to the schedule library. When a selection is made on the calendar, they don't show events on the calendar but just return the event object containing the details of the selection. select calls the createEventWithPointer function passing in the event object, which we then add to the caledar.*/
	function createEventWithPointer(event) {
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

	function deleteEventFromCalender() {
		ec.removeEventById(currentEventSelected.event.id);
	}

	/*following code parses events for a user returned by the database.js file. Formats each event and returns an event Object array which the calendar library can take in and add each event into the calendar*/
	function getArrayOfEventsFromDatabase() {
		let eventsJson = data.post.results;
		let eventObjects = [];
		for (let i = 0; i < eventsJson.length; i++) {
			eventObjects.push(formatEventObject(eventsJson[i]));
		}
		return eventObjects;
	}

	/*will return a string of all events objects currently on the calendar, this is done so it can be bound to an <input bind:value=someVal> and sent through a <form> to the backend +page.server.js. We bind final string value to the allEvents variable which is then bound to the <input>.

		you might notice that 2 hours are added to each events start and end time, this was due to a bug which shifted the time of each event back 2 hours */
	function returnAllEventsFromCaledar() {
		let eventsFromCalendar = ec.getEvents();
		let updatedEventsFromcalendar = [];
		//TEMPORARY FIX PLEASE!!!!!!!!!!!!!!
		for (let i = 0; i < eventsFromCalendar.length; i++) {
			let event = eventsFromCalendar[i];
			event.start.setHours(event.start.getHours() + 2);
			event.end.setHours(event.end.getHours() + 2);

			updatedEventsFromcalendar.push(event);
		}
		allEvents = JSON.stringify(updatedEventsFromcalendar);
	}

	/*used to assign a random hex color to events on the calendar*/
	function getRandomHexColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />

<!--Delete button-->
<div class="flex flex-col items-center">
	<button on:click={deleteEventFromCalender} class="btn btn-primary place-item-center"
		>Delete Event</button
	>
</div>

<!--makes up the Save Events button, form used to send all events currently on the calendar to the backend to be saved into the calendar.-->
<form method="POST" action="?/saveDatabaseEvents">
	<div class="flex flex-col items-center py-1">
		<input type="hidden" name="eventArray" bind:value={allEvents} />
		<button on:click={returnAllEventsFromCaledar} class="btn btn-secondary place-item-center"
			>Save Events</button
		>
	</div>
</form>
