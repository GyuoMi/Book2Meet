

<div class="flex items-center justify-center h-screen">  
    <h1 class="absolute top-32 text-3xl font-bold ">HOME</h1>
    
    <div class="card w-96 bottom-32 left-1 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Schedule Your Calender</h2>
          <p>This is where you can indicate your available times on the calender.</p>
          <div class="card-actions justify-end">
            <a href="/schedule" class="btn btn-primary">Schedule</a>
          </div>
        </div>
      </div>
    
    
      <div class="card w-96 bottom-32 left-10 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Book Sessions</h2>
          <p>This is where you can book sessions with other users</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Book</button>
          </div>
        </div>
      </div>

</div>

if (!password) {
  passwordStrengthText = 'Please enter a password';
} else if (password.length < 8) {
  passwordStrengthText = 'Password must be at least 8 characters long';
} else if (!hasLowercase) {
  passwordStrengthText = 'Password must contain at least one lowercase letter';
} else if (!hasUppercase) {
  passwordStrengthText = 'Password must contain at least one uppercase letter';
} else if (!hasNumber) {
  passwordStrengthText = 'Password must contain at least one number';
} else if (!hasSpecialChar) {
  passwordStrengthText = 'Password must contain at least one special character';
} else if (!regex.test(password)) {
  passwordStrengthText = 'Password is invalid';
} else {
  passwordStrengthText = 'Password is strong';
}