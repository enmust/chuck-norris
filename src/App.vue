<template>
  <div id="app" class="d-flex flex-column h-100">

    <app-header/>

    <div class="main">
      <router-view/>
    </div>

    <app-footer/>

  </div>
</template>

<script>
  import AppHeader from "./components/AppHeader";
  import AppFooter from "./components/AppFooter";

  export default {
    components: {AppFooter, AppHeader}
  }
</script>

<style>
  html, body {
    height: 100%;
  }

  #app {
    /* Todo: Change font */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #303030;
    color: #fff;
  }

  .main {
    padding-top: 66px;
    flex: 1;
    color: #fff;
    background-color: #303030;
  }
</style>
