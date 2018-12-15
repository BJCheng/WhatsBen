import createSocketServer from 'socket.io';



class SocketServer {
  constructor(httpServer) {
    if (!this._io) {
      this._io = createSocketServer(httpServer);
    }
  }

  setupUserNamespace(namespace) {
    const userSocket = this._io.of(namespace);
    userSocket.on('connection', (socket) => {
      socket.on('send-message', (msg) => {
        this.emitEventTo(namespace, 'receive-message', msg);
      });
    });
  }

  emitEventTo(namespace, event, data) {
  }
}

// const socket;
// export default get