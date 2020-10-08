<template>
  <div>
    <h1>Chat</h1>
    <input v-model="roomName" placeholder="Room name" :disabled="joined">
    <button @click="join" :disabled="joined">join</button>
    <div v-if="joined">
      <input type="text" v-model="talkBody">
      <button @click="sendTalk">Send</button>
      <div v-for="talk in talks">{{ talk.body }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as socketioClient from 'socket.io-client'
import {events, JoinRoomReq, Talk, talkType} from 'common';

const endpoint = 'http://localhost:3000';
const socket = socketioClient.connect(endpoint);
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('on connect');
    resolve();
  });
});

socket.on('disconnect', () => {
  console.log('socket disconnected');
});

@Component
export default class Chat extends Vue {
  private roomName: string = '';
  private talks: Talk[] = [];
  private joined: boolean = false;
  private talkBody: string = '';

  async join() {
    this.joined = true;
    await connectedPromise;
    const req: JoinRoomReq = {
      name: this.roomName,
    }
    socket.emit(events.join_room, req);

    socket.on(events.receive_talk, (data: unknown) => {
      const talkEither = talkType.decode(data);
      if(talkEither._tag === 'Left') {
        console.log('invalid talk:', data);
        return;
      }
      const talk = talkEither.right;
      console.log('talk:', talk);
      this.talks.unshift(talk);
    });
  }

  sendTalk() {
    const talk: Talk = {
      roomName: this.roomName,
      body: this.talkBody,
    };
    this.talkBody = '';
    socket.emit(events.send_talk, talk);
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
