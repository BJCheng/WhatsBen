import createSocketIoServer from 'socket.io';

class Sockets {
  constructor(httpServer) {
    this._io = createSocketIoServer(httpServer);
  }

  setupUserNamespace(namespace) {
    const userSocket = this._io.of(namespace);
    console.log(`server connected on ${namespace}`);
    userSocket.on('connection', function (socket) {
      console.log(`client connected on ${socket.nsp.name}`);
    });
  }

  emit(event, namespace, data) {
    console.log(`server emitting ${event} on ${namespace} with`, data);
    const userSocket = this._io.of(namespace);
    userSocket.emit(event, data);
  }
}

let sockets;
function setupSockets(httpServer) {
  sockets = new Sockets(httpServer);
  sockets.setupUserNamespace('/ben');
}
export { setupSockets, sockets };