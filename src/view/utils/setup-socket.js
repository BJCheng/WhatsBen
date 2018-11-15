import io from 'socket.io-client';

export default () => {
  const userSocket = io(`${global.__apiUrl__}/ben`);
  userSocket.emit('send-message', 'hi');
  userSocket.on('connection', (socket) => {
    console.log('client socket connected');
  });
  userSocket.on('receive-message', (msg) => {
    // dispatch actions
    console.log(`client receive message back from server: ${msg}`);
  });
};