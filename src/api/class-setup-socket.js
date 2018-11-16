import createSocketIoServer from 'socket.io';

class Sockets {
  constructor(httpServer) {
    this._io = createSocketIoServer(httpServer);
  }

  setupUserNamespace(handle) {
    const userSocket = this._io.of(handle);

    console.log(`server connected on ${handle}`);

    userSocket.on('connection', function (socket) {
      console.log(`client connected on ${socket.nsp.name}`);
    });
  }

  emitUserFact(handle, fact) {
    console.log(`server emitting fact on ${handle}`, fact);

    const userSocket = this._io.of(handle);
    userSocket.emit('receive-message', fact);
  }
}

let sockets;

function setupSockets(httpServer) {
  sockets = new Sockets(httpServer);
  sockets.setupUserNamespace('/ben');
}

export { setupSockets, sockets };