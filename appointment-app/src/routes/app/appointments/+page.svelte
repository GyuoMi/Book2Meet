<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import '@event-calendar/core/index.css';
	import Interaction from '@event-calendar/interaction';
	import { deleteEventFromCalender, getArrayOfEventsFromDatabase } from '../schedule/page.modules';
  import Country from './Country.svelte';
	/** @type {import('./$types').PageServerLoad} */
	export let data;


	/** @type {import('./$types').ActionData} */
	export let form;
  
//sets the rating if the user has been searched for, default is 5 stars
  let rating;
  try{
    rating = Math.trunc(form.rating);
  }
  catch{
    rating = 5;
  }
//gets all possible emails from the database and stories them in list to be searched up 
  const countries = data.emails;
  //used to separate user and client bookings
  let allUserBookingsJson = [];
	let userBookings = [];
	let clientEvents = getArrayOfEventsFromDatabase(form);
	let currentEventSelected;
	let ec;
  //imports the necessary plugings
	let plugins = [TimeGrid, Interaction];
  //sets options for the calendar
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
			let startEventDate = new Date(event.start);
			let endEventDate = new Date(event.end);
			if (startDate <= startEventDate && endDate >= endEventDate) {
        //creates new event object created from the existing date object
        let eventVar = {
          id: clientEvents[i].id,
          start: event.start,
          end:event.end 
        };
        //adds it to user rating list
        userBookings.push(eventVar);
        //turns it into a json string so it can be submitted
        allUserBookingsJson = JSON.stringify(userBookings);
				return true;
			}
		}
		return false;
	}
  //allows a user to create an event with a Pointer
	function createEventWithPointer(event) {
		// if (!isUserBookingValid(event)) {
		// 	return;
		// }
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

  //this is used to delete the event that is selected
	function getCurrentEventClicked(event) {
		// if (isUserBooking(event.event)) {
		currentEventSelected = event;
		// }
	}
  //sets variable to json string before submitting
  function setVariableToJsonStringOfEvents(){
    allUserBookingsJson = JSON.stringify(userBookings); 
  }

//from this point the code is used to handel the suggested searches
/* FILTERING countres DATA BASED ON INPUT */	
let filteredCountries = [];
// $: console.log(filteredCountries)	

//used for suggested searches
const filterCountries = () => {
	let storageArr = []
	if (inputValue) {
		countries.forEach(country => {
			 if (country.toLowerCase().startsWith(inputValue.toLowerCase())) {
				 storageArr = [...storageArr, makeMatchBold(country)];
			 }
		});
	}
  //stores the filtered countries 
	filteredCountries = storageArr;
}	


/* HANDLING THE INPUT */
let searchInput; // use with bind:this to focus element
let inputValue = "";
	
$: if (!inputValue) {
	filteredCountries = [];
	hiLiteIndex = null;
}

const clearInput = () => {
	inputValue = "";	
	searchInput.focus();
}
//when a user clicks on the country it sets the text in the search bar	
const setInputVal = (countryName) => {
	inputValue = removeBold(countryName);
	filteredCountries = [];
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
}	
	

/* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */	
let hiLiteIndex = null;
//$: console.log(hiLiteIndex);	
$: hiLitedCountry = filteredCountries[hiLiteIndex]; 	
	
const navigateList = (e) => {
	if (e.key === "ArrowDown" && hiLiteIndex <= filteredCountries.length-1) {
		hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
	} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
		hiLiteIndex === 0 ? hiLiteIndex = filteredCountries.length-1 : hiLiteIndex -= 1
	} else if (e.key === "Enter") {
		setInputVal(filteredCountries[hiLiteIndex]);
	} else {
		return;
	}
} 
</script>
<svelte:window on:keydown={navigateList} />
<!-- used to send whatever the user searched back to the backend-->
<form method="POST" autocomplete="off" action="?/getSearchedEmailEvents">
  <div class="flex items-center max-w-md mx-auto py-1">
   <div class="autocomplete">
    <input name="email" id="country-input" 
					 type="text" 
					 placeholder="Search By Email" 
					 bind:this={searchInput}
					 bind:value={inputValue} 
					 on:input={filterCountries}>
  </div>
	
  <input type="submit">
	
</div>

 	<!-- FILTERED LIST OF EMAILS FROM DATABASE-->
	{#if filteredCountries.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredCountries as country, i}
				<Country itemLabel={country} highlighted={i === hiLiteIndex} on:click={() => setInputVal(country)} />
			{/each}			
		</ul>
	{/if}
</form>

  <!-- sets the star rating on of the user  -->
<div class="flex flex-row-reverse px-5">
    {#each {length:5} as _, i}
    {#if i > Math.abs(5-rating)-1}
      <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    {:else}
        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    {/if}
{/each}
</div>

<Calendar bind:this={ec} {plugins} {options} />
<!-- delete button to delete the event from the calendar -->
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

<!-- used to style the search bar  -->
<style>
div.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
	width: 300px;
  padding-left: 100;
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
  left:735px;
	width: 297px;
	border: 1px solid #ddd;
	background-color: #ddd;
}	
</style>	

