import io from 'socket.io-client';
import { receiveMessage, updateContact, hadSetupClientSocket } from '../actions';
import apiUrl from '../utils/api-url';

export default (namespace, dispatch) => {
  const userSocket = io(`${apiUrl}/${namespace}`);
  dispatch(hadSetupClientSocket());
  userSocket.on('receive-message', ({ from, message }) => {
    dispatch(receiveMessage(message));
    dispatch(updateContact(from));
  });
};