const socket = io("http://localhost:3000");
socket.on()
socket.on('connect',(res)=>{
    console.log(res)
})
socket.on('message',(data)=>{
    console.log(data)
    socket.emit('message',"Hai mwon")
})

