<script>
	import '../app.css';
	/** @type {import('./$types').LayoutData} */
    export let data;

	console.log(data);
  	//sort the results returned according to the start date/times
	let bookings = data.post.results.sort((a, b) => new Date(a.EVENT_START) - new Date(b.EVENT_START));
	
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
					<li><a>Profile</a></li>
					<li><a>Schedule</a></li>
					<li><a>Booking</a></li>
					<li><a href="/Meetings">Past Meetings</a></li>
					<li><a>About</a></li>
				</ul>
			</div>
		</div>
	</div>

	<!--
    Lenox ~ I modififed the navbar Book2Meet button that when it is clicked it takes us back to the welcome page
  -->
	<div class="flex-1">
		<a href=".">
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
			<li>
				<a><span class="no-events-message">Your Upcoming Bookings</span></a>
			</li>
			<li><hr class="dropdown-divider"></li>

			<!--
				add the table structure as another element in the dropdown
				if the returned results is not empty display the table - else display a message
			-->

			<li>
				{#if data.post.results.length > 0}
				<div class="overflow-x-auto" style="max-width: 100%;">
					<table class="table table-zebra w-full">
					  <!-- headers of the table -->
					  <thead>
						<tr>
						  <th></th>
						  <th>Event Start</th>
						  <th>Event End</th>
						</tr>
					  </thead>
					  <tbody>
						<!--loops over every object returned from backend-->
						{#each data.post.results as booking, index}
						<!--the rows of the table-->
						<tr>
							<th>{index + 1}</th>
                			<td>{new Date(booking.EVENT_START).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
							<td>{new Date(booking.EVENT_END).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
						</tr>
						{/each}
					  </tbody>
					</table>
				</div>
				{:else}
        		<a><span class="no-events-message">No Upcoming Bookings</span></a>
      			{/if}
			</li>
    	</ul>
  	</div>
</div>


<!--
	so that the messages displayed in the dropdown appears in one line
	(not every word under each other)
-->
<style>
	.no-events-message {
	  white-space: nowrap;
	}

</style>

<slot/>

