const {createServer} = require('http');
const {Server} = require("socket.io");
const httpServer = createServer();
const io= new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173'
    }
});

let PlayerScores = []
//Establishing the connection 
io.on('connection',(socket)=>{
socket.on('scores',(scores)=>{
    PlayerScores.push({...scores,id:socket.id})
    socket.emit('playerScores',PlayerScores);
    setInterval(()=>{
        socket.emit('playerScores',PlayerScores);
    },5000)
})

})


httpServer.listen(3000,()=>{
    console.log("Serving on port 3000");
})