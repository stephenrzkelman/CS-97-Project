import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState([]);

  useEffect(async () => {
    const response = fetch('/test')
      .then(rawResponse => rawResponse.json())
      .then(response => setMessage(response.message))
      .catch(error => console.error(error));
  });

  return (
    <>{message.map(item => <h3>{item}</h3>)}</>
  );
}

export default App;
