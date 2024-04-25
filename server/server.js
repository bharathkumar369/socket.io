const { createServer } = require("http");
const {Server} = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173",
    }
});

let playerDetails = []

io.on("connection", (socket)=>{
    socket.on("scores",(score)=>{
        playerDetails.push({...score,id:socket.id});

        console.log(playerDetails);
    
        socket.emit("playerScore",playerDetails);

        setInterval(()=>{
            socket.emit("playerScore",playerDetails)
        },5000);
    })

});

httpServer.listen(3001, () => {
    console.log("server is connected!");
})