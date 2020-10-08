<template>
  <div>
    Chat
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as socketioClient from 'socket.io-client'
import {events} from 'common';

@Component
export default class Chat extends Vue {
  mounted() {
    const endpoint = 'http://localhost:3000';
    const socket = socketioClient.connect(endpoint);

    socket.on('connect', () => {
      console.log('on connect');

      socket.emit(events.join_room, {
        name: 'room name 1'
      });
    });

    socket.on('event', (data: any) => {
      console.log(`on event: ${data}`);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
