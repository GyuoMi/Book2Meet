<script>
	import '../../app.css';
	/** @type {import('./$types').LayoutData} */
    export let data;
	console.log(data);

	//obtain the seperate queries from data
	let bookingDetails = data.bookingDetails.results;
	let allBookings = data.allBookings.results;

  	//sort the results returned according to the start date/times
	let bookings = [];
	bookingDetails.sort((a, b) => new Date(a.EVENT_START) - new Date(b.EVENT_START));
	let waitingList = [];
	allBookings.sort((a, b) => new Date(a.EVENT_START) - new Date(b.EVENT_START));
	let cancelledBookings = [];

	bookingDetails.forEach(function(booking) {
    	let eventId = booking.EVENT_ID;
    	console.log('EVENT_ID:', eventId);
		let eventWaitingList = [];
    	allBookings.forEach(function(entry) {
			if(entry.EVENT_ID === eventId){
				eventWaitingList = eventWaitingList.concat(entry)
			}
			eventWaitingList.sort((a, b) => new Date(a.DATE_BOOKED) - new Date(b.DATE_BOOKED));
			
		});
		if (eventWaitingList.length > 0 && eventWaitingList[0].CLIENT_ID === booking.CLIENT_ID) {
      		if (booking.BOOKING_VALID) {
            bookings.push(booking);
        	} else {
            cancelledBookings.push(booking);
        	}
		}else{
			if (booking.BOOKING_VALID) {
            waitingList.push(booking);
       		} else {
            cancelledBookings.push(booking);
        	}
		}
  });

  function getDuration(start, end) {
  const duration = new Date(end) - new Date(start);
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${hours}h ${minutes}m`;
}
</script>

<html data-theme="autumn" />

<div class="navbar bg-base-100">
	<div class="flex-none">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-square">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
          <li><a href="/">Home</a></li>
					<li><a href="/profile">Profile</a></li>
					<li><a href="/Meetings">Past Meetings</a></li>
					<li><a href="/schedule">Schedule</a></li>
          <li><a href="/appointments">Booking</a></li>
					<li><a>About</a></li>
				</ul>
			</div>
		</div>
	</div>

	<!--
    Lenox ~ I modififed the navbar Book2Meet button that when it is clicked it takes us back to the welcome page
  -->
	<div class="flex-1">
		<a href="/">
			<img
				src="/images/book2meet.png"
				class="rounded-lg"
				style="width: 7%; height:auto; display: block; margin: 0 auto;position: absolute;top: 7px; left:60px"
			/>
		</a>
	</div>

	<!--
		notification dropdown starts here
	-->

  	<div class="dropdown dropdown-end">
		<!--how the dropdown button appears-->
    	<button ><i class='far fa-bell' style='font-size:24px'></i></button>
    	<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-100">

			<!--
				Upcoming bookings
			-->

			<li>
				<a><span class="header-item">Your Upcoming Bookings</span></a>
			</li>
			<!--
				add the table structure as another element in the dropdown
				if the returned results is not empty display the table - else display a message
			-->
			<li>
				{#if bookings.length > 0}
				<div class="overflow-x-auto" style="max-width: 100%;">
					<table class="table table-zebra w-100">
					  <!-- headers of the table -->
					  <thead>
						<tr>
						  <th>Booked With</th>
						  <th>Time</th>
						  <th>Duration</th>
						</tr>
					  </thead>
					  <tbody>
						<!--loops over every object returned from backend-->
						{#each bookings as booking}
						<!--the rows of the table-->
						<tr>
							<th>{booking.CLIENT_FIRST_NAME} {booking.CLIENT_LAST_NAME}</th>
                			<td>{new Date(booking.EVENT_START).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</td>
							<td>{getDuration(booking.EVENT_START, booking.EVENT_END)}</td>
						</tr>
						{/each}
					  </tbody>
					</table>
				</div>
				{:else}
        		<a><span class="no-events-message">No Upcoming Bookings</span></a>
      			{/if}
			</li>

			<!--
				Waiting list
			-->

			<li>
				<a><span class="header-item">Waiting List</span></a>
			</li>
			<!--
				add the table structure as another element in the dropdown
				if the returned results is not empty display the table - else display a message
			-->
			<li>
				{#if waitingList.length > 0}
				<div class="overflow-x-auto" style="max-width: 100%;">
					<table class="table table-zebra w-100">
					  <!-- headers of the table -->
					  <thead>
						<tr>
						  <th>Booked With</th>
						  <th>Time</th>
						  <th>Duration</th>
						</tr>
					  </thead>
					  <tbody>
						<!--loops over every object returned from backend-->
						{#each waitingList as booking}
						<!--the rows of the table-->
						<tr>
							<th>{booking.CLIENT_FIRST_NAME} {booking.CLIENT_LAST_NAME}</th>
                			<td>{new Date(booking.EVENT_START).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</td>
							<td>{getDuration(booking.EVENT_START, booking.EVENT_END)}</td>
						</tr>
						{/each}
					  </tbody>
					</table>
				</div>
				{:else}
        		<a><span class="no-events-message">No Waiting Lists to Show</span></a>
      			{/if}
			</li>

			<!--
				Cancelled Bookings
			-->

			<li>
				<a><span class="header-item">Cancelled Bookings</span></a>
			</li>
			<!--
				add the table structure as another element in the dropdown
				if the returned results is not empty display the table - else display a message
			-->
			<li>
				{#if cancelledBookings.length > 0}
				<div class="overflow-x-auto" style="max-width: 100%;">
					<table class="table table-zebra w-100">
					  <!-- headers of the table -->
					  <thead>
						<tr>
						  <th>Booked With</th>
						  <th>Time</th>
						  <th>Duration</th>
						</tr>
					  </thead>
					  <tbody>
						<!--loops over every object returned from backend-->
						{#each cancelledBookings as booking}
						<!--the rows of the table-->
						<tr>
							<th>{booking.CLIENT_FIRST_NAME} {booking.CLIENT_LAST_NAME}</th>
                			<td>{new Date(booking.EVENT_START).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</td>
							<td>{getDuration(booking.EVENT_START, booking.EVENT_END)}</td>
						</tr>
						{/each}
					  </tbody>
					</table>
				</div>
				{:else}
        		<a><span class="no-events-message">No Cancelled Bookings</span></a>
      			{/if}
			</li>
    	</ul>
  	</div>
</div>
<slot/>

<!--
	.header-item
	so that the messages displayed in the dropdown appears in one line
	(not every word under each other)

	.menu li:nth-child
	changes the bg colour of certain items as specified in the params
	(in this case all odd items in dropdown)
-->
<style>
	.header-item {
	  white-space: nowrap;
      font-weight: bold;
	}

	.menu li:nth-child(odd) {
	  background-color: #f0f0f0;
	}

</style>