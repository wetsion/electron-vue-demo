<template>
  <div id="app">
    <div id="title">
      <Title/>
    </div>
    <div id="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/Title/title'
  export default {
    name: 'electron-vue-demo',
    components: { Title }
  }
</script>

<style>
  /* CSS */
  html, body, div {
    margin: 0;
    padding: 0;
    -webkit-app-region: no-drag;
  }

  #title {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 42px;
  }

  #container {
    position: relative;
    margin-top: 50px;
    z-index: 2;
  }
</style>
