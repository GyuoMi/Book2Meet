<script lang="ts">
	import { emailPattern, passwordPattern } from './validation.js';
	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';


let isVisible = false;

afterUpdate(() => {
  isVisible = true;
});

  //used to check if all details entered on the page are valid

	let email = '';
	let password = '';
	let emailError = '';

  //booleans used to assert correctness of statements
	let emailValid = false;
	let passwordValid = false;
	let isFormValid = false;
	let formErrorMessage = '';

	function handleSubmit() {
		isFormValid = email.trim() !== '' && password.trim() !== '';
		if (!isFormValid) {
			formErrorMessage = 'Please fill in all required fields and ensure they are valid';
		} else {
			formErrorMessage = '';
		}
		return;
	}

	function handleClick() {
		handleSubmit();
		password = '';
	}
</script>

<style>
	.fade-in {
	  animation: fadeAnimation 1.0s ease-in forwards;
	  opacity: 0;
	}
  
	@keyframes fadeAnimation {
	  from {
		opacity: 0;
	  }
	  to {
		opacity: 1;
	  }
	}
  </style>

<!-- 
    ~ The "flex...h-screen" centers the contents of the body to the middle of the page
    ~ You use "absolute" to specify the spacing in pixels
    ~ "mt -20 " means go down 20px relative to the above button

-->

<div class="hero min-h-screen bg-base-100 top-10" class:fade-in={isVisible}>
	<div class="hero-content flex-col lg:flex-row-reverse">
		<img src="/images/welcome.jpg" class="rounded-lg" style="width: 50%; height:auto;" />
		<img src="/images/book2meet.png" class="rounded-lg" style="position:absolute; width: 10%; height:auto;top:20px; left:125px" />
		<img src="/images/dots.png" class="rounded-lg" style="position:absolute; width: 10%; height:auto;top:0px; right:150px" />
		<div>
			<h1 class="text-5xl font-bold">Ready to Book an Appointment?</h1>
			<p class="py-6">
				Book2Meet is a software tool or platform designed to 
				facilitate the scheduling and management of appointments. 
				It streamlines the process of booking appointments and eliminating 
				the need for manual scheduling.</p>

			<a href="/signup"><button class="btn btn-primary">Sign up</button></a>
			<a href="/login"><button class="btn btn-primary">Login</button></a>
		</div>
	</div>
</div>


<!-- 
   Book information Tab
-->

<div class="hero min-h-screen bg-base-200" class:fade-in={isVisible}>

	<img src="/images/book6.png" class="rounded-lg" style="position:absolute; width: 55%; height:auto; left:10px ; top:850px" />
	<img src="/images/dots.png" class="rounded-lg" style="position:absolute; width: 10%; height:auto;top:760px; left:0px" />
	<div class="card w-2/6 h-96 bottom-10 left-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl">Book Meetings with other users!</h2>
			<p class="py-6 mt-8 text-zinc-600 " style="position:absolute">Welcome to our streamlined appointment booking system, where booking your next appointment 
				is a breeze! Say goodbye to lengthy phone calls and endless back-and-forth emails. 
				Our user-friendly platform puts you in control, allowing you to book appointments with ease.</p>
			<div class="card-actions justify-end">
				<!-- <a href="/schedule" class="btn btn-primary">Schedule</a> -->
			</div>
		</div>
	</div>
</div>

<!-- 
   Schedule information Page
-->

<div class="hero min-h-screen bg-base-100" class:fade-in={isVisible}>

	<img src="/images/schedule.jpg" class="rounded-lg" style="position:absolute; width: 40%; height:auto;right:200px " />
	<img src="/images/dots.png" class="rounded-lg" style="position:absolute; width: 12%; height:auto;top:1480px; right:0px" />
	<div class="card w-1/3 h-96 bottom-10 right-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl">Schedule Your Calender</h2>
			<p class="py- text-6 mt-8 zinc-600 "> Take control of your schedule like never before. 
				Our intuitive calendar interface allows you to manage your availability, 
				choose your own time slots, and update your schedule in real-time. 
				Say goodbye to manual scheduling conflicts and double bookings.</p>
			<div class="card-actions justify-end">
				<!-- <button class="btn btn-primary">Book</button> -->
			</div>
		</div>
	</div>
</div>

<!-- 
   Final page
-->

<div class="hero min-h-screen bg-base-200" class:fade-in={isVisible}>

	<img src="/images/final.png" class="rounded-lg" style="position:absolute; width: 60%; height:auto; left:10px " />
	<img src="/images/dots.png" class="rounded-lg" style="position:absolute; width: 12%; height:auto;top:2220px; left:0px" />
	<div>
		<div class="flex flex-col h-2 border-opacity-50 bg-primary" style="position:absolute; right:200px; top:2590px">
			<div class="divider">________________________________________________________</div>
			
		  </div>
		<h1 class="text-7xl font-bold" style="position:absolute; right:80px">Get Started Today!</h1>
		<p class="py-6">
		</p>

		<a href="/signup"><button class="btn btn-primary mt-14" style="position:absolute; right:300px">Sign up</button></a>
		<a href="/login"><button class="btn btn-primary mt-14" style="position:absolute; right:400px">Login</button></a>
	</div>

	
</div>


<!-- 
   Footer
-->
<img src="/images/dots.png" class="rounded-lg" style="position:absolute; width: 12%; height:auto;top:3080px; right:0px" />
<img src="/images/dots.png" class="rounded-lg" style="position:absolute; width: 12%; height:auto;top:3080px; left:0px" />
<footer class="footer footer-center p-2 bg-primary text-primary-content">
	<div>
		<svg
			width="50"
			height="50"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill-rule="evenodd"
			clip-rule="evenodd"
			class="inline-block fill-current"
			><path
				d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
			/></svg
		>
		<p class="font-bold">
			Book2Meet (Pty) Ltd. <br />Providing reliable appointment platform
		</p>
		<p>Copyright © 2023 - All right reserved</p>
	</div>
	<div>
		<span class="footer-title">Social Media</span>
		<div class="grid grid-flow-col gap-4">
			<a
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
					><path
						d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
					/></svg
				></a
			>
			<a
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
					><path
						d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
					/></svg
				></a
			>
			<a
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current" ><path
						d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
					/></svg
				></a
			>
		</div>
	</div>
</footer>

