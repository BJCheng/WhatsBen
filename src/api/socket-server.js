import createSocketServer from 'socket.io';

export default class Socket {
  constructor(httpServer) {
    if (!this._io) {
      // if (!httpServer)
      //   throw new Error('Missing http server when initializing socket server');
      this._io = createSocketServer(httpServer);
    }
  }

  setupUserNamespace(namespace) {
    this._io.emit('receive-message');
    const userSocket = this._io.of(namespace);
    userSocket.on('connection', (socket) => {
      socket.on('send-message', (msg) => {
        this.emitTo(namespace, 'receive-message', msg);
      });
    });
  }

  emitTo(namespace, evet, data) {
    const socket = this._io.of(namespace);
    socket.emit('receive-message', data);
  }
}