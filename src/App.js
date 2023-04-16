import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message });
      setReply(response.data.reply);
    } catch (error) {
      console.error(error);
      setReply('Error fetching response');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatGPT</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="input"
          />
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
        <div className="response">
          <h2>Response:</h2>
          <p>{reply}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
