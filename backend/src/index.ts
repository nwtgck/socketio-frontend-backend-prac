import * as http from 'http';
import * as socketio from 'socket.io'

const port = 3000;
const server = http.createServer((req, res) => {
  res.end('Server is running.\n');
});
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('on connection');
  socket.emit('event', 'this is an event');
});
server.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
