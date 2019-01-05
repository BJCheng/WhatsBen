import io from 'socket.io-client';
import { receiveMessage, updateContact } from '../actions';

export default (namespace, dispatch) => {
  const userSocket = io(`${global.__apiUrl__}/${namespace}`);
  userSocket.on('receive-message', ({ from, message }) => {
    dispatch(receiveMessage(message));
    dispatch(updateContact(from));
  });
};