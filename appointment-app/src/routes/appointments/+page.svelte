<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';
	import { deleteEventFromCalender, getArrayOfEventsFromDatabase } from '../schedule/page.modules';
	/** @type {import('./$types').ActionData} */
	export let form;

	let userBookings = [];
	let clientEvents = getArrayOfEventsFromDatabase(form);
	let currentEventSelected;
	let ec;
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
		events: clientEvents,
		eventDurationEditable: false,
		eventStartEditable: false,
		select: createEventWithPointer,
    eventClick: getCurrentEventClicked

	};
	//checks to see if user made a booking inside a client availibility window
	function isUserBookingValid(event) {
		for (let i = 0; i < clientEvents.length; i++) {
			let startDate = new Date(clientEvents[i].start);
			let endDate = new Date(clientEvents[i].end);
			//!!!!!!tempory removing 2 hours to dates for now
			startDate.setHours(startDate.getHours() - 2);
			endDate.setHours(endDate.getHours() - 2);
			//fix
			let startEventDate = new Date(event.start);
			let endEventDate = new Date(event.end);
			if (startDate <= startEventDate && endDate >= endEventDate) {
				return true;
			}
		}
		return false;
	}
	function createEventWithPointer(event) {
		if (!isUserBookingValid(event)) {
			return;
		}
		ec.addEvent({
			start: event.start,
			end: event.end,
			title: 'booking'
		});
		userBookings.push(event);
	}

	//ensures that the user can only delete their own booking
  //Todo fix this
	function isUserBooking(event) {
		for (let i = 0; i < userBookings.length; i++) {
			if (userBookings[i].id == event.id) {
				return true;
			}
		}
		return false;
	}

	function getCurrentEventClicked(event) {
		// if (isUserBooking(event.event)) {
			currentEventSelected = event;
		// }
	}
</script>

<form method="POST" action="?/getSearchedEmailEvents">
	<div align="center">
		<input
			name="email"
			type="text"
			placeholder="search by email"
			class="input input-bordered input-primary w-100"
		/>
		<button class="btn btn-primary">Button</button>
	</div>
</form>
<Calendar bind:this={ec} {plugins} {options} />

<div class="flex flex-col items-center">
	<button
		on:click={deleteEventFromCalender(ec, currentEventSelected)}
		class="btn btn-primary place-item-center">Delete Event</button
	>
</div>
