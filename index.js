import {Low} from 'lowdb';
import { JSONFile } from 'lowdb/node';
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


let port = process.env.PORT || 3000;

const defaultData = {
  lines: [
    {
      text: "Once upon a time",
      color: "green"

    },
  ]
};

const app = express();
app.use(express.static('public'));
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

io.on("connection", (socket) => {
  console.log('a user connected ' + socket.id);

  db.read().then(() => {
    socket.emit('story-lines-updated', db.data);
  });

  socket.on('new-story-line', async (data) => {
    await db.read();
    db.data.lines.push(data);
    await db.write();
    
    io.emit('story-lines-updated', db.data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected ' + socket.id);
  });
});

httpServer.listen(port);


