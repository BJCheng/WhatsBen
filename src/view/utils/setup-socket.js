import io from 'socket.io-client';

export default () => {
  const userSocket = io(`${global.__apiUrl__}/ben`);
  userSocket.emit('send-message', 'hi');
  userSocket.on('receive-message', (msg) => {
    // TODO: dispatch actions
    console.log(`client receive message from server: ${msg}`);
  });
};