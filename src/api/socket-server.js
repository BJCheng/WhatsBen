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
    let socket;
    return () => {
      if (!socket) {
        socket = mongoConnection().then((db) => {
          return db.collection(collectionName);
        });
      }

      return socket;
    }
    if (!this._io) {
      throw new Error('not able to emit event, io not setup yet');
    }
    console.log(`emitting ${event} event to ${namespace}...`);
    this._io.of(namespace).emit(event, data);
  }
}

const socket;
export default get