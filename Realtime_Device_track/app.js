const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app); // socket.io needs direct access to the server
const path = require("path");

// This enables Socket.IO to handle WebSocket connections and provide real-time, 
// bidirectional communication between clients (browser) and the server.
const io = socketIo(server);

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.set("views", 'views');

/**
 * This listens for new client connections to the server.
 * When a client connects to the server via a Socket.IO connection, the connection event is triggered.
 * Each client gets its own socket object, which can be used to send and receive messages to/from that specific client.
 */
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle receiving location data from clients
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id); // Emit the disconnected user id to other clients
    });
});

app.get("/", (req, res) => {
    res.render('Users/index');
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
