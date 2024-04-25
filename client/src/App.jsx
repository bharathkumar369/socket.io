import React from "react";
import io from "socket.io-client";
import Input from "./component/Input";
import "./App.css";

function App() {
  const [score, setScore] = React.useState({});
  const [allScores,setAllScores] = React.useState([]);

  const socket = io("localhost:3001");

  const connectSocket = () => {
    socket.on("connection",(socket) => {
      console.log(socket);
    });
  };
  React.useEffect(() => {
    connectSocket();
  },[]);

  const handleInput = (event) => {
    let { name, value } = event.target;
    // console.log({[name]:value});
    let currentObject = { [name]: value };

    setScore((prev) => ({ ...prev, ...currentObject }));
  };

  const sendScores = () => {
    console.log(score);

    socket.emit("scores",score);

    socket.on("playerScore",(playerDetails)=>{
      setAllScores(playerDetails);
    })
  };

  return (
    <main>
      <h1>REACT MULTIPLAyER </h1>
      <Input
        placeholder="enter your name"
        name="name"
        handleInput={handleInput}
      />
      <Input
        placeholder="enter your score"
        name="score"
        handleInput={handleInput}
      />

      <button onClick={sendScores}>Publish score</button>

      {allScores.length>0 ? <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Score</th>

          </tr>

          {allScores.map((score)=>(
            <tr>
              <td>{score?.name}</td>
              <td>{score?.score}</td>
            </tr>
          ))}
        </tbody>
        
      </table> : <></>}

    </main>
  );
}

export default App;
