<template>
  <div id="app">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import * as socketioClient from 'socket.io-client'

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  mounted() {
    const endpoint = 'http://localhost:3000';
    const socket = socketioClient.connect(endpoint);

    socket.on('connect', () => {
      console.log('on connect');
    });

    socket.on('event', (data: any) => {
      console.log(`on event: ${data}`);
    });

    socket.on('disconnect', () => {

    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
