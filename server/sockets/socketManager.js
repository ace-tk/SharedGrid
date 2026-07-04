let onlineUsers = 0;

const initializeSockets = (io) => {
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

module.exports = {
  initializeSockets
};
