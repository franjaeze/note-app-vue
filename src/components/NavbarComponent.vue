<template>
<nav class="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">My Notes</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
         <RouterLink class="nav-link" aria-current="page" to="/create">Create Note</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link " aria-current="page" to="/reate">Archived notes</RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
import { RouterLink } from 'vue-router';
export default{
    components: {
        RouterLink
    }
}


</script>