<template>
  <div id="app">
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand mx-auto fs-3" to="/my-tasks">noc noc Challenge</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <div class="wrapper">
      <NavbarComponent />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <p class="my-5 mx-auto lead">Made by Sebastian Hitz</p>
      </div>
    </nav>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent
  }
}
</script>

<style>
.wrapper {
  display: flex;
}

.content {
  flex-grow: 1;
}
</style>
