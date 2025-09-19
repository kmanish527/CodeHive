require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const ACTIONS = require('./actions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
    },
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    const socketIds = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    return socketIds
        .map((socketId) => {
            const username = Object.keys(userSocketMap).find(
                (user) => userSocketMap[user] === socketId
            );
            return { socketId, username };
        })
        .filter((client) => client.username); 
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[username] = socket.id;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.LANGUAGE_CHANGE, ({ roomId, language }) => {
        socket.to(roomId).emit(ACTIONS.LANGUAGE_CHANGE, { language });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        const username = Object.keys(userSocketMap).find(
            (user) => userSocketMap[user] === socket.id
        );

        rooms.forEach((roomId) => {
            socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: username,
            });
        });
        
        delete userSocketMap[username];
        socket.leave();
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});