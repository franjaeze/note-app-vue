<template>
<NavbarComponent />
<div class="m-5">
  <router-view/></div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';



export default{
  components:{ NavbarComponent, 

},

} 

</script>



<style>

 
</style>
