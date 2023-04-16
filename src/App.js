import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

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
      <h1>ChatGPT Chatbox</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
      <h2>Reply from ChatGPT:</h2>
      <p>{reply}</p>
    </div>
  );
}

export default App;
