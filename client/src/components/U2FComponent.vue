<template>
  <div class="hello">
    <button v-on:click="register()">Start registration</button>
    <button v-on:click="login()">Start login</button>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'U2FComponent',
    methods: {
      register() {
        if (window.u2f && window.u2f.register) { // True if the browser is supported
          axios({ method: "GET", url: "https://localhost/register", withCredentials: true}).then(result => {

            console.log(result.data);
            window.u2f.register(result.data.appId, [result.data], [], response => {

              console.log(response);
              axios({ method: "POST", url: "https://localhost/register", data: { registerResponse: response }, 
                      headers: { "content-type": "application/json" }, withCredentials: true }).then(result => {
                        console.log(result.data);

              }, error => {
                console.error(error);
              });
            });
          }, error => {
            console.log(error);
          });
        }
      },
      login() {
        if (window.u2f && window.u2f.sign) { // True if the browser is supported
          axios({ method: "GET", url: "https://localhost/login", withCredentials: true}).then(result => {

            console.log(result.data);
            window.u2f.sign(result.data.appId, result.data.challenge, [result.data], response => {

              console.log(response);
              axios({ method: "POST", url: "https://localhost/login", data: { loginResponse: response }, 
                      headers: { "content-type": "application/json" }, withCredentials: true }).then(result => {
                        console.log(result.data);

              }, error => {
                console.error(error);
              });
            });
          }, error => {
            console.log(error);
          });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
