
<!-- 
    ~ The "flex...h-screen" centers the contents of the body to the middle of the page
    ~ You use "absolute" to specify the spacing in pixels
    ~ "mt -20 " means go down 20px relative to the above button

-->
<div class="flex items-center justify-center h-screen">  
    <h1 class="absolute top-40 text-3xl font-bold ">Welcome to Book2Meet</h1>
    <a href="/signup" class="absolute top-72 btn btn-wide btn-primary">SIGN UP</a>
    <button class="absolute top-72 mt-20 btn btn-wide btn-primary">LOG IN</button>
</div>

<slot />



