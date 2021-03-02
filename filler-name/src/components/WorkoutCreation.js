import { useState } from 'react';
import { API, createHeader } from '../constants';

function WorkoutCreationForm(props) {
  const [state, setState] = useState({
    name: '',
    description: ''
  });

  const handleChange = event => {
    event.preventDefault();
    const { id, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await API.post('/exercises', state, createHeader(window.localStorage.getItem('jwt')));
    // set parent state to reflect changes
  }

  const inputStyle = {
    display: 'block',
    padding: '10px'
  };

  return (
    <form>
      <label style={inputStyle} htmlFor="name">Name:</label>
      <input style={inputStyle} type="text" id="name" placeholder="Enter Workout Name" value={state.name} onChange={handleChange} />
      <label style={inputStyle} htmlFor="description">Description:</label>
      <textarea style={inputStyle} id="description" value={state.description} onChange={handleChange} />
      <input style={inputStyle} type="submit" value="Create" onClick={handleSubmit} />
    </form>
  );
}

export default WorkoutCreationForm;