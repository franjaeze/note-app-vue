<template>
<NavbarComponent  @show-archived="showArchived"/>
<div class="m-5">
  <router-view :show-archived="setArchived"/></div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import { useUserStore } from './stores/notes';


export default{
  components:{ NavbarComponent

},

methods:{
  showArchived() {
     useUserStore.setShowArchived(true) 
    }
}
} 

</script>



<style>

 
</style>
