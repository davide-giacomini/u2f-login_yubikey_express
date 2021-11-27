<template>
  <div class="hello">
    <button v-on:click="register()">Start registration</button>
    <button v-on:click="login()">Start login</button>
  </div>
</template>

<script>
  export default {
    name: 'U2FComponent',
    methods: {
      register() {},
      login() {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
