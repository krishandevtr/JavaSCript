const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server,
    {
        cors:
        {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

app.use(cors());

app.get("/", (req, res) => res.send("Server is running."));

io.on("connection", (socket) => {
    
    socket.emit("me", socket.id);
    socket.on("disconnect", () => console.log("User disconnected"));
    socket.on("calluser",({userToCall,signalData,from ,name})=>{
        io.to(userToCall).emit('calluser',{signal:signalData,from ,name })
    })
    socket.on('annswerCall',(data)=>{
        io.to(data.to).emit("callaccepted",data.signal)
    })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
