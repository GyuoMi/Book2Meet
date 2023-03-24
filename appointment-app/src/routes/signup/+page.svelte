<script>
    let password = '';
    let confirmPassword = '';
    let message = '';
  
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
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Email Address</span>
          </label>
          <input type="text" placeholder="john.snow@gmail.com" class="input input-bordered" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Password</span>
          </label>
          <input type="text" placeholder="Password" class="input input-bordered" bind:value={password} />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Confirm Password</span>
          </label>
          <input type="text" placeholder="Repeat Password" class="input input-bordered" bind:value={confirmPassword} />
        </div>
        {#if message}
           <p class="absolute top-96 left-10 mt-2 text-red-500">{message}</p>
        {/if}
         <div class="form-control mt-6">
            <a href="/signup" class="btn btn-primary" on:click={handleClick}>SiGn up</a>
          </div>
        <label class="label">
          <span class="label-text" style="position:absolute; left:85px; bottom:30px">Already have an account?</span>
          <a href="/login" class="label-text-alt link link-primary link-hover underline" style="position:absolute; left:244px; bottom:31px">LOG IN!</a>
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



