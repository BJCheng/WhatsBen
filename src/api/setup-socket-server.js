import SocketServer from './socket-server';

export default (httpServer) => {
  const socketServer = new SocketServer(httpServer);
  socketServer.setupUserNamespace('/ben');
};

// todo: connect all the user in redis
// setTimeout(() => {
//   const socket = new Socket(httpServer);
//   socket.setupUserNamespace('/ben');
// }, 3000);