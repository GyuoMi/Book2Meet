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
		<a href=".">
			<img
				src="/images/book2meet.png"
				class="rounded-lg"
				style="width: 7%; height:auto; display: block; margin: 0 auto;position: absolute;top: 7px; left:60px"
			/>
		</a>
	</div>
  <div class="dropdown dropdown-end">
    <button ><i class='far fa-bell' style='font-size:24px'></i>
    </button>
    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
</div>
<slot />