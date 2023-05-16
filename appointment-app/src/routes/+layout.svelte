<script>
	import '../app.css';
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
					<li><a href="/analytics">Analytics</a></li>
					<li><a href="/meetings">Past Meetings</a></li>
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
	<div class="flex-none">
		<button class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-5 h-5 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
				/></svg
			>
		</button>
	</div>
</div>
<slot />
