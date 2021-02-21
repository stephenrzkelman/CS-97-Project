import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [exercises, setExercises] = useState([]);

  useEffect(async () => {
    fetch('/exercises')
      .then(rawResponse => rawResponse.json())
      .then(exercises => setExercises(exercises))
      .catch(error => console.log(error));
  });

  return (
    <>
      {exercises.map(exercise => <h3>{exercise.name}</h3>)}
    </>
  );
}

export default App;
