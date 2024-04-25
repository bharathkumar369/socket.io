import React from "react";
import io from "socket.io-client";
import Input from "./component/Input";
import "./App.css";

function App() {

  const [score,setScore] = React.useState({})

  const socket = io("localhost:3000");

  const connectSocket = () => {
    socket.on(
      "connection",
      (socket) => {
        console.log(socket);
      },
      []
    );
  };
  React.useEffect(() => {
    connectSocket();
  });

  const handleInput = (event) => {
    let {name,value} = event.target
    // console.log({[name]:value});
    let currentObject = {[name]:value};

    setScore((prev)=>({...prev,...currentObject}))
  }
  return (
    <main>
      <h1>REACT MULTIPLAyER </h1>
      <Input placeholder="enter your name" name="name" handleInput={handleInput}/>
      <Input placeholder="enter your score" name="score" handleInput={handleInput}/>
    </main>
  );
}

export default App;
