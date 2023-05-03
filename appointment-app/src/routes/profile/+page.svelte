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
				<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal account details</p>
			  </div>
			<form id="profile-form" class="divide-y divide-gray-200">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
					<label for="name" class="text-sm font-medium leading-6 text-gray-900">Name</label>
					<input id="name" name="name" type="text" placeholder="Name" class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2" readonly>
				</div>
			<dl class="divide-y divide-gray-200">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
					<label for="surname" class="text-sm font-medium leading-6 text-gray-900">Surname</label>
          			<input id="surname" name="surname" type="text" placeholder="Surname" class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2" readonly>
				</div>
			<dl class="divide-y divide-gray-200">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
					<label for="email" class="text-sm font-medium leading-6 text-gray-900">Email</label>
          			<input id="email" name="email" type="email" placeholder="Email" class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2" readonly>
				</div>
			<dl class="divide-y divide-gray-100">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1">
					<label for="password" class="text-sm font-medium leading-6 text-gray-900">Password</label>
          			<input id="password" name="password" type="password" placeholder="******" class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2" readonly>
				</div>
		  	<div class="form-control mt-6">
				<button id="edit-btn" class="btn btn-primary">Edit</button>
		  	</div>
		</div>
	</div>
	<script>
		const editButton = document.getElementById("edit-btn");
		const nameInput = document.getElementById("name");
		const surnameInput = document.getElementById("surname");
		const emailInput = document.getElementById("email");
		const passwordInput = document.getElementById("password");

		editButton.addEventListener("click", function(event) {
  			event.preventDefault();
  			if (editButton.textContent === "Edit") {
    			editButton.textContent = "Save";
    			nameInput.removeAttribute("readonly");
    			surnameInput.removeAttribute("readonly");
    			emailInput.removeAttribute("readonly");
    			passwordInput.removeAttribute("readonly");
  			} else {
    			editButton.textContent = "Edit";
    			nameInput.setAttribute("readonly", "");
    			surnameInput.setAttribute("readonly", "");
    			emailInput.setAttribute("readonly", "");
    			passwordInput.setAttribute("readonly", "");
  			}
			});
	  </script>
</div>