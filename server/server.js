const http = require('http');
const app = require('./app');
const env = require('./config/env');
const { Server } = require('socket.io');

const { initializeSockets } = require('./sockets/socketManager');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

initializeSockets(io);

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
