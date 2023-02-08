const express=require('express');
const socket=require('socket.io');

const app=express();//initialized and server ready

app.use(express.static("./public"));

let port=3001;
let server=app.listen(port,()=>{
    console.log("listening to port" + port);
});

let io=socket(server);
io.on("connection",(socket)=>{
    console.log("socket connection established");
})

