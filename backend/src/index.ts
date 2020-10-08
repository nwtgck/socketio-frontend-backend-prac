import * as http from 'http';
import * as socketio from 'socket.io'
import {events, joinRoomReqType, talkType} from 'common';

const port = 3000;
const server = http.createServer((req, res) => {
  res.end('Server is running.\n');
});
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('on connection');

  socket.on(events.join_room, (data: unknown) => {
    const joinRoomReqEither = joinRoomReqType.decode(data);
    if (joinRoomReqEither._tag === 'Left') {
      console.log('invalid join room req:', data);
      return;
    }
    const joinRoomReq = joinRoomReqEither.right;
    socket.join(joinRoomReq.name);
    console.log('room joined: ', joinRoomReq);
  });

  socket.on(events.send_talk, (data: unknown) => {
    const talkEither = talkType.decode(data);
    if(talkEither._tag === 'Left') {
      console.log('invalid talk:', data);
      return;
    }
    const talk = talkEither.right;
    io.to(talk.roomName).emit(events.receive_talk, talk);
  });
});
server.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
