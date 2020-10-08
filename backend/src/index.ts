import * as http from 'http';
import * as socketio from 'socket.io'
import {events} from 'common';

const port = 3000;
const server = http.createServer((req, res) => {
  res.end('Server is running.\n');
});
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('on connection');

  socket.on(events.join_room, (data: unknown) => {
    console.log('join room: ', data);
  });

  socket.emit('event', 'this is an event');
});
server.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
