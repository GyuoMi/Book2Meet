<script lang="ts">
    import { emailPattern, passwordPattern } from './validation.js';
    import { onMount } from 'svelte';

    let password = '';
    let confirmPassword = '';
    let email = '';
    let Fname = '';
    let Lname = '';
    let message = '';
      
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    let FnameError = '';
    let LnameError = '';
    let formErrorMessage='';

    let isFormValid = false;
    let passwordValid = false;
    let confirmPasswordValid =false;
    let emailValid = false;
    let FnameValid = false;
    let LnameValid = false;

    function checkPasswords() {
      if (password !== confirmPassword) {
        message = 'Passwords do not match.';
      } else {
        message = '';
      }
    }

    function handleClick() {
    checkPasswords();
    handleSubmit();
    password='';
    confirmPassword='';
  }

  
  
  
  
  let showPassword = false;

  function toggleShowPassword() {
    showPassword = !showPassword;
    }
  
  function handlePasswordInput(event: Event) {
    const target = event.target as HTMLInputElement;
    password = target.value;
  
  }
  let passwordStrengthText = '';

  function getPasswordStrength() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (!password) {
      passwordStrengthText = '';
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
      passwordValid = true;
    }
  }

  

  onMount(() => {
    getPasswordStrength(); // call the function once when the component is mounted
  });

  function handleSubmit() {
    isFormValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && Lname.trim() !== '' && Fname.trim() !== '';
    

    if (!isFormValid) {
      formErrorMessage = 'Please fill in all required fields and ensure they are valid';
    } else {
      formErrorMessage = '';
    }
      return;
    }

  </script>


<!-- 
    ~ The "flex...h-screen" centers the contents of the body to the middle of the page
    ~ You use "absolute" to specify the spacing in pixels
    ~ "mt -20 " means go down 20px relative to the above button

-->

<div class="hero min-h-screen bg-base-00">
  <div class="hero-content flex-col lg:flex-row-reverse">
    
    <div class="lg:text-top">
      <h1 class="text-5xl font-bold" style="position:absolute; top:95px; left:150px">Sign up</h1>
      <p class="py-6 text-gray-400 font-medium" style="position:absolute; top:135px; left:150px">Open your account to start booking appointments today!</p>
    </div>

    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" style="position:absolute; top:190px; left:147px">
      <div class="card-body">
        
        <div class="form-control" style="width:43%">
          <label class="label">
            <span class="label-text text-primary">First Name</span>
          </label>
          <input type="First name" 
                 placeholder="John" 
                 class="input input-bordered" 
                 bind:value={Fname} 
                 on:blur={() => {
                  if (Fname.trim() === '') {
                    FnameError = 'Please fill in all the required fiels';
                    }else {
                       FnameError = '';
                       FnameValid = true;
                    }
                }}/>
                {#if FnameError}
                <p class="text-red-600 text-sm">{FnameError}</p>
                {/if}
                 
            
        </div>

        <div class="form-control" style="position:absolute;width: 43%; top:32px; left:190px;">
          <label class="label">
            <span class="label-text text-primary">Last Name</span>
          </label>
          <input type="names" 
                 placeholder="Snow" 
                 class="input input-bordered" 
                 bind:value={Lname} 
                 on:blur={() => {
                  if (Lname.trim() === '') {
                    LnameError = 'Please fill in all the required fiels';
                    }else {
                       LnameError = '';
                       LnameValid = true;
                    }
                }}/>
                {#if LnameError}
                <p class="text-red-600 text-sm">{LnameError}</p>
                {/if}
                 
            
        </div>

<!--
  Email field
-->

        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Email Address</span>
          </label>
          <input  type="email" 
                  placeholder="john.snow@gmail.com" 
                  class="input input-bordered" 
                  bind:value={email}
                  on:input={() => {
                    if (!emailPattern.test(email)) {
                      emailError = 'Invalid email address';
                      }else {
                         emailError = '';
                         emailValid = true;
                      }
                  }}/>
                  {#if emailError}
                  <p class="text-red-600 text-sm">{emailError}</p>
                  {/if}
        </div>

        
<!--
  Password fields
-->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Password</span>
          </label>

          {#if showPassword}
            <input
              type="text"
              class="input input-bordered"
              placeholder="Password"
              
              on:blur={getPasswordStrength }
              bind:value={password}
            />
          {:else}
          <input type="password" 
                 placeholder="Password" 
                 class="input input-bordered" 
                 bind:value={password}
                 on:blur={getPasswordStrength}/>

               {/if}

               
            
              <button
                  class=" text-stone-300"
                  style="position:relative; bottom:35px; left:275px; width:45px"
                  type="button"
                  on:click={toggleShowPassword}
                >
                 
                 <i class={showPassword ? 'far fa-eye-slash' : 'far fa-eye-slash'}></i>
                </button>


                {#if passwordStrengthText != 'Password is strong'}
                <div class="text-sm text-red-600" style="position:relative; bottom:22px; left:4px">
                  {passwordStrengthText}
                </div>
              {:else}
              <div class="text-sm text-green-600" style="position:relative; bottom:22px; left:4px">
                {passwordStrengthText}
              </div>
              {/if}
            
     
        </div>


<!--
  Confirm password fields
-->
        <div class="form-control" style="position:relative; bottom:24px;px">
          <label class="label">
            <span class="label-text text-primary">Confirm Password</span>
          </label>
          <input type="text" 
                 placeholder="Repeat Password" 
                 class="input input-bordered" 
                 bind:value={confirmPassword} 
                 on:input={() => {
                  if (confirmPassword !== password) {
                    confirmPasswordError = 'Passwords do not match';
                  } else {
                    confirmPasswordError = '';
                    confirmPasswordValid = true;
                  }
                }}/>
                 {#if confirmPasswordError}
                  <p class="text-sm text-red-600">{confirmPasswordError}</p>
                 {/if}
        </div>






        <div class="error-message">
          {#if formErrorMessage}
          <div class="alert alert-error shadow-lg mt-0" style="height:20px">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span style="font-size: 14px;">Please fill in all the required fields.</span>
            </div>
          </div>
          {/if}
        </div>

       




        
         <div class="form-control mt-6">
            <a href={emailValid && passwordValid && confirmPasswordValid ? '/login' : '#'} class="btn btn-primary" on:click={handleClick}>SIGN UP</a>
          </div>
        <label class="label">





          <span class="label-text" style="position:absolute; left:85px; bottom:30px">Already have an account?</span>
          <a href="/login" class="label-text-alt link link-primary link-hover underline" style="position:absolute; left:244px; bottom:31px">LOG IN!</a>
        </label>
      </div>
    </div>
  </div>


  <div class="flex flex-col w-full lg:flex-row" style="position:absolute; left:600px; height:700px; width:2px">
    <!--
      <div class="divider lg:divider-horizontal bg-base-300 opacity-20">.</div> 
    -->
    
  
  </div>

  <div class="lg:text-top">
    <img alt="project logo" class="absolute top-44 right-24" style="position:absolute;width: 45%; height: auto;top:180px;right:120px" src='/images/signup1.jpg' />
    <img alt="project logo" class="absolute top-20 right-64" style="position:absolute; width: 20%; height: auto;top:100px; right:150px" src='/images/book2meet1.png' />

  </div>

 
</div>

<div class="hero min-h-16 bg-base-100">

</div>

<!-- 
   Footer
-->

<footer class="footer footer-center p-2 bg-primary text-primary-content">
  <div>
    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="inline-block fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
    <p class="font-bold">
      Book2Meet (Pty) Ltd. <br/>Providing reliable appointment platform
    </p> 
    <p>Copyright © 2023 - All right reserved</p>
  </div> 
  <div>
  <span class="footer-title">Social Media</span> 
    <div class="grid grid-flow-col gap-4">
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </div>
</footer>



<slot />



