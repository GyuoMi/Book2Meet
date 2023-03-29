
<!-- 
    ~ The "flex...h-screen" centers the contents of the body to the middle of the page
    ~ You use "absolute" to specify the spacing in pixels
    ~ "mt -20 " means go down 20px relative to the above button

-->

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">

    
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>


    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
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
          <input type="text" placeholder="Password" class="input input-bordered" />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <a href="/schedule" class="btn btn-primary">Login</a>
        </div>
        <label class="label">
          <span class="label-text" style="position:absolute; left:85px; bottom:30px">Do not have an account?</span>
          <a href="/signup" class="label-text-alt link link-primary link-hover underline" style="position:absolute; left:244px; bottom:31px">SIGN UP!</a>
        </label>
      </div>
    </div>
  </div>
</div>


<slot />