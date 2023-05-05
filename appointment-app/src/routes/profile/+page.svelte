<script lang = "ts">


  	/** @type {import('./$types').PageServerLoad} */
	  export let data;
    
    console.log(data);
    let clientInfo = data.post.results[0];
    let firstName = clientInfo.CLIENT_FIRST_NAME;
    let lastName = clientInfo.CLIENT_LAST_NAME;
    let email = clientInfo.CLIENT_EMAIL;
    let password = clientInfo.CLIENT_PASSWORD;

	const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    /*
	const editButton = document.getElementById('edit-btn');
	const nameInput = document.getElementById('name');
	const surnameInput = document.getElementById('surname');
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');
*/
	function validateEmail() {
		const email = emailInput.value.trim();
		if (email === '' || !emailPattern.test(email)) {
			emailInput.classList.add('red-border');
			emailInput.setCustomValidity('Please enter a valid email address.');
		} else {
			emailInput.classList.remove('red-border');
			emailInput.setCustomValidity('');
		}
	}

	function validatePassword() {
		const password = passwordInput.value.trim();
		if (password === '' || !passwordPattern.test(password)) {
			passwordInput.classList.add('red-border');
			passwordInput.setCustomValidity(
				'Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.'
			);
		} else {
			passwordInput.classList.remove('red-border');
			passwordInput.setCustomValidity('');
		}
	}

	function validateName() {
		const name = nameInput.value.trim();
		if (name === '') {
			nameInput.classList.add('red-border');
		} else {
			nameInput.classList.remove('red-border');
		}
	}

	function validateSurname() {
		const surname = surnameInput.value.trim();
		if (surname === '') {
			surnameInput.classList.add('red-border');
		} else {
			surnameInput.classList.remove('red-border');
		}
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<div class="card-body">
			<div class="avatar">
				<div class="w-24 rounded-full">
					<img src="https://i.pinimg.com/736x/58/52/bd/5852bd0b1872da0ff337592e3da30f07.jpg" />
				</div>
			</div>
			<div class="px-4 sm:px-1">
				<h3 class="text-base font-semibold leading-7 text-gray-900">Profile Information</h3>
				<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
					Account details and prefrences.
				</p>
			</div>
			<form method="POST" action="?/saveClientInfoToDatabase" id="profile-form" class="divide-y divide-gray-200">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
					<label for="name" class="text-sm font-medium leading-6 text-gray-900">Name</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="Name"
						class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2"
            bind:value={firstName}
					/>
				</div>
				<dl class="divide-y divide-gray-200">
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
						<label for="surname" class="text-sm font-medium leading-6 text-gray-900">Surname</label>
						<input
							id="surname"
							name="surname"
							type="text"
							placeholder="Surname"
							class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2"
              bind:value={lastName}
						/>
					</div>
					<dl class="divide-y divide-gray-200">
						<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
							<label for="email" class="text-sm font-medium leading-6 text-gray-900">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Email"
								class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2"
                bind:value={email}
							/>
						</div>
						<dl class="divide-y divide-gray-100">
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
								<label for="password" class="text-sm font-medium leading-6 text-gray-900"
									>Password</label
								>
								<input
									id="password"
									name="password"
									type="password"
									class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2"
                  bind:value={password}
								/>
							</div>
							<div class="form-control mt-6">
								<button id="saveBtn" class="btn btn-primary">Save</button>
							</div>
						</dl>
					</dl>
				</dl>
			</form>
		</div>
	</div>
</div>

<!-- 
   Footer
-->

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
					class="fill-current"
					><path
						d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
					/></svg
				></a
			>
		</div>
	</div>
</footer>

