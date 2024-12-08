import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Input from './components/Input';
import './App.css';

let socket; // Declare socket globally to reuse

function App() {
  const [score, setScores] = useState({});
  const [scores, setAllScores] = useState([]);

  useEffect(() => {
    socket = io('http://localhost:3000'); // Initialize socket once

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });

    socket.on('playerScores', (playerScores) => {
      console.log('Received playerScores:', playerScores);
      setAllScores(playerScores);
    });

    return () => {
      socket.disconnect(); // Cleanup socket
    };
  }, []);

  function handleInput(event) {
    const { name, value } = event.target;
    setScores((prevScores) => ({
      ...prevScores,
      [name]: value,
    }));
  }

  function sendScores() {
    if (!score.name || !score.score) {
      alert('Please enter both name and score!');
      return;
    }

    socket.emit('scores', score); // Emit to server
  }

  function clearScores() {
    setAllScores([]); // Clear the scores state
  }

  return (
    <>
      <h1 className="heading">React Multiplayer Dashboard</h1>
      <Input name="name" placeholder="Enter your name: " handleInput={handleInput} />
      <Input name="score" placeholder="Enter your Score: " handleInput={handleInput} />
      <button className="Send-Scores" onClick={sendScores}>
        Publish
      </button>
      <button className="Clear-Scores" onClick={clearScores}>
        Clear Scores
      </button>
      <div className="table-container">
      <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Scores</th>
    </tr>
  </thead>
  <tbody>
    {scores.map((score, index) => (
      <tr key={index}>
        <td>{score?.name || 'No Name'}</td>
        <td>{score?.score || 'No Score'}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>

    </>
  );
}

export default App;
