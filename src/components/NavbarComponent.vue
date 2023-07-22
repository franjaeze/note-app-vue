<template>
<nav id="nav" class="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark mb-3" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand " href="#" >My Notes</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item ms-2 me-2">
         <RouterLink class="nav-link" aria-current="page" to="/create">Create Note</RouterLink>
        </li>
        <li class="nav-item">
            <button class="nav-link " aria-current="page" @click="toggleArchived" >Archived notes</button>
        </li>
      
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/notes';
 
export default{
    components: {
        RouterLink
    },

   
  methods: {
    toggleArchived() {
      const userStore = useUserStore();
      userStore.setShowArchived();
    /*   console.log(userStore.getShowArchived) */
    }
  }

}


</script>
<style>


#nav{
    background-color: var(--genral-color);
}

</style>