<script lang="ts">
    import { emailPattern, passwordPattern } from './validation.js';
    import { onMount } from 'svelte';

    let password = '';
    let confirmPassword = '';
    let email = '';
    let names = '';
    let message = '';
      
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    let namesError = '';
    
    function checkPasswords() {
      if (password !== confirmPassword) {
        message = 'Passwords do not match.';
      } else {
        message = '';
      }
    }

    function handleClick() {
    checkPasswords();
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
    }
  }

  onMount(() => {
    getPasswordStrength(); // call the function once when the component is mounted
  });

  </script>


<!-- 
    ~ The "flex...h-screen" centers the contents of the body to the middle of the page
    ~ You use "absolute" to specify the spacing in pixels
    ~ "mt -20 " means go down 20px relative to the above button

-->

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    
    <div class="lg:text-top">
      <h1 class="text-5xl font-bold" style="position:absolute; top:150px; left:150px">Sign up</h1>
      <p class="py-6" style="position:absolute; top:185px; left:150px">Open your account to start booking appointments today.</p>
    </div>

    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" style="position:absolute; top:250px; left:148px">
      <div class="card-body">
        
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Names</span>
          </label>
          <input type="text" placeholder="John Snow" class="input input-bordered" />
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
                  }
                }}/>
                 {#if confirmPasswordError}
                  <p class="text-sm text-red-600">{confirmPasswordError}</p>
                 {/if}
        </div>

        
         <div class="form-control mt-6">
            <a href="/signup" class="btn btn-primary" on:click={handleClick}>SiGn up</a>
          </div>
        <label class="label">




          <span class="label-text" style="position:absolute; left:85px; bottom:30px">Already have an account?</span>
          <a href="/login" class="label-text-alt link link-primary link-hover underline" style="position:absolute; left:244px; bottom:31px" disabled={!email || !password || !confirmPassword || emailError || passwordError || confirmPasswordError}>LOG IN!</a>
        </label>
      </div>
    </div>
  </div>
</div>
<!--
<div class="flex items-center justify- bg-base-200 h-screen">  
    <h1 class="absolute top-40 left-80 text-5xl font-bold ">Signup</h1>
    
    <input type="text" placeholder="Names" class="absolute top-64 left-64 input input-bordered input-primary w-full max-w-xs" />
    <input type="text" placeholder="Email Address" class="absolute top-64 left-64 mt-20 input input-bordered input-primary w-full max-w-xs" />
    
    <input type="text" placeholder="Password" class="absolute top-64 left-64 mt-40 input input-bordered input-primary w-full max-w-xs" bind:value={password} />
    <input type="text" placeholder="Confirm Password" class="absolute top-64 left-64 mt-60 input input-bordered input-primary w-full max-w-xs" bind:value={confirmPassword} />
    {#if message}
      <p class="absolute top-64 left-64 mt-52 text-red-500">{message}</p>
    {/if}
    <a href="/signup" class="absolute top-72 left-72 mt-72 btn btn-wide  btn-primary" on:click={handleClick}>SIGN UP</a>
    
    <img alt="project logo" class="absolute top-20 right-1" style="width: 45%; height: auto;" src='/images/signup.jpg' />
</div>
-->



<slot />



