<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';
	import { deleteEventFromCalender, getArrayOfEventsFromDatabase } from '../schedule/page.modules';
  import autoComplete from './autoCompleteStyle.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;

  let allUserBookingsJson = [];
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
			//fix
			let startEventDate = new Date(event.start);
			let endEventDate = new Date(event.end);
			if (startDate <= startEventDate && endDate >= endEventDate) {
        let eventVar = {
          id: clientEvents[i].id,
          start: event.start,
          end:event.end 
        };
        userBookings.push(eventVar);
        allUserBookingsJson = JSON.stringify(userBookings);
        console.log(userBookings);
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

  function setVariableToJsonStringOfEvents(){
    allUserBookingsJson = JSON.stringify(userBookings); 
  }

//from this point the code is used to handel the suggested searches
let filteredSearches = [];

const filterSearch = () => {
	let storageArr = []
	if (inputValue) {
		countries.forEach(country => {
			 if (country.toLowerCase().startsWith(inputValue.toLowerCase())) {
				 storageArr = [...storageArr, makeMatchBold(country)];
			 }
		});
	}
	filteredSearches = storageArr;
}	

let searchInput; // use with bind:this to focus element
let inputValue = "";
	
$: if (!inputValue) {
	filteredSearches = [];
	hiLiteIndex = null;
}
const clearInput = () => {
	inputValue = "";	
	searchInput.focus();
}
const setInputVal = (email) => {
	inputValue = removeBold(email);
	filteredSearches = [];
	hiLiteIndex = null;
	document.querySelector('#country-input').focus();
}	
const makeMatchBold = (str) => {
	// replace part of (country name === inputValue) with strong tags
	let matched = str.substring(0, inputValue.length);
	let makeBold = `<strong>${matched}</strong>`;
	let boldedMatch = str.replace(matched, makeBold);
	return boldedMatch;
}
const removeBold = (str) => {
	//replace < and > all characters between
	return str.replace(/<(.)*?>/g, "");
	// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
}	/* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */	
let hiLiteIndex = null;
//$: console.log(hiLiteIndex);	
$: hiLitedCountry = filteredSearches[hiLiteIndex]; 	
const navigateList = (e) => {
	if (e.key === "ArrowDown" && hiLiteIndex <= filteredSearches.length-1) {
		hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
	} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
		hiLiteIndex === 0 ? hiLiteIndex = filteredSearches.length-1 : hiLiteIndex -= 1
	} else if (e.key === "Enter") {
		setInputVal(filteredSearches[hiLiteIndex]);
	} else {
		return;
	}
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

<!-- makes up the Save Events button, form used to send all events currently on the calendar to the backend to be saved into the calendar. -->

<form method="POST" action="?/saveBookings">
	<div class="flex flex-col items-center py-1">
		<button
			class="btn btn-secondary place-item-center">Save Events</button
		>
<input type="hidden" name="userBookings" bind:value={allUserBookingsJson} />
			</div>
</form> 
  <svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={submitValue}>
  <div class="autocomplete">
    <input id="country-input" 
					 type="text" 
					 placeholder="Search Country Names" 
					 bind:this={searchInput}
					 bind:value={inputValue} 
					 on:input={filterSearch}>
  </div>
	
  <input type="submit">
	
	<!-- FILTERED LIST OF COUNTRIES -->
	{#if filteredSearches.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredSearches as country, i}
				<Country itemLabel={country} highlighted={i === hiLiteIndex} on:click={() => setInputVal(country)} />
			{/each}			
		</ul>
	{/if}
</form>
<!-- used to style the search bar  -->
<style>
div.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
	width: 300px;
}
input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
	margin: 0;
}
input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}
input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
}
	
#autocomplete-items-list {
	position: relative;
	margin: 0;
	padding: 0;
	top: 0;
	width: 297px;
	border: 1px solid #ddd;
	background-color: #ddd;
}	
</style>	
