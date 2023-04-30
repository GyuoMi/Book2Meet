<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';
	import { getArrayOfEventsFromDatabase } from '../schedule/page.modules';
	/** @type {import('./$types').ActionData} */
	export let form;

	let userBookings = [];
	let clientEvents = getArrayOfEventsFromDatabase(form);

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
		select: createEventWithPointer
	};
	//ensures that the user can only delete their own booking
	function isUserBooking(selectedId) {
		for (let i = 0; i < clientEvents.length; i++) {
			if (clientEvents[i].id == selectedId) {
				return false;
			}
		}
		return true;
	}
	//checks to see if user made a booking inside a client availibility window
	function isUserBookingValid(event) {
		for (let i = 0; i < clientEvents.length; i++) {
			console.log(clientEvents[i]);
			console.log(event.start);
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
		// userBookings.push(event.)
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
