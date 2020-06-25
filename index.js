const logger = require('pino')();
const redis = require('redis');
const fs = require('fs');

const config = require('config');
const micro = require('micro');

const { parsed : env } = require('dotenv').config();

const app = require((process.env.NODE_ENV === "production") ? './build' : './src');

const log = logger.child({ level: env.LOG_LEVEL || 'info', prettyPrint: true });

logger.debug(config, 'configuration:');
const port = config.get('port');

const server = micro(app);
const io = require('socket.io')(server);

// const redisClient = redis.createClient({
//     host: env.REDIS_HOST,
//     port: env.REDIS_PORT,
//     no_ready_check: true,
//     auth_pass: env.REDIS_PASSWORD
// });

// redisClient.on('connect', () => {   
//     log.info("Redis connected");
// }); 

// redisClient.on('error', (err) => {
//     log.error("Error " + err)
// });

const users = {};

const socketToRoom = {};

io.on('connection', socket => {

    let user = { 
        id: socket.id,
        ...socket.handshake.query
    };

    log.debug(JSON.stringify(user), 'User connected');

    socket.on("join room", roomID => {
      if (users[roomID]) {
        const length = users[roomID].length;
        if (length === 4) {
            socket.emit("room full");
            return;
        }
        users[roomID].push(socket.id);
      } else {
          users[roomID] = [socket.id];
      }
      
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

      socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];

      if (room) {
          room = room.filter(id => id !== socket.id);
          users[roomID] = room;
      }
    });
});

server.listen(port);