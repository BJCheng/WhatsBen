import io from 'socket.io-client';
import { receiveMessage, updateContact } from '../actions';

export default (namespace, dispatch) => {
  const userSocket = io(`${global.__apiUrl__}/${namespace}`);
  userSocket.emit('send-message', 'hi');
  userSocket.on('receive-message', (msg) => {
    console.log(`client receive message from server: ${msg}`);
    dispatch(receiveMessage(msg));
    dispatch(updateContact(msg.from));
  });
};