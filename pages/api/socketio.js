// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Server } from 'socket.io';

export default function socketIOHandler(req, res) {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      socket.broadcast.emit('a user connected');

      socket.on('ping', (msg) => {
        socket.emit('pong');
        console.log(msg);
      });

      socket.on('hello', (msg) => {
        socket.emit('hello', 'world! (FROM SERVER)!');
      });

      socket.on('debug', (msg) => {
        socket.emit('debug-finished', 'ALL WORKING WELL');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
