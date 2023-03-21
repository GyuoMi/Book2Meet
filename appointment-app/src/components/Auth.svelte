<script context="module">
    import { initAuth } from "../auth";
    export const { user, googleLogin } = initAuth()
    
    user.subscribe((v) => console.log(v));
</script>