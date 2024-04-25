const socket = io("http://localhost:3000");

socket.on("coneect",(response)=>{
    console.log(response);
})

socket.on("message",(data)=>{
    console.log(data);

    socket.emit("message","hello there")
})