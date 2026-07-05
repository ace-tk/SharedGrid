let onlineUsers = 0;
let ioInstance = null;

const initializeSockets = (io) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    onlineUsers++;
    
    console.log(`[Socket] Connected\nSocket ID: ${socket.id}\nOnline Users: ${onlineUsers}`);

    socket.emit('connection-success', {
      socketId: socket.id,
      connectedAt: new Date().toISOString()
    });

    io.emit('online-users', {
      onlineUsers
    });

    socket.on('disconnect', () => {
      onlineUsers--;
      
      console.log(`[Socket] Disconnected\nSocket ID: ${socket.id}\nOnline Users: ${onlineUsers}`);

      io.emit('online-users', {
        onlineUsers
      });
    });
  });
};

const broadcastBlockClaimed = (block) => {
  if (ioInstance) {
    ioInstance.emit('block-claimed', { block });
  }
};

module.exports = {
  initializeSockets,
  broadcastBlockClaimed
};
