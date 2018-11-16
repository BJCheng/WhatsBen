import SocketServer from './socket-server';

export default (httpServer) => {
  // next想singletone的getInstance怎麼傳參數
  const socketServer = SocketServer.getSocket(httpServer);
  socketServer.setupUserNamespace('/ben');
};

// todo: connect all the user in redis
// setTimeout(() => {
//   const socket = new Socket(httpServer);
//   socket.setupUserNamespace('/ben');
// }, 3000);