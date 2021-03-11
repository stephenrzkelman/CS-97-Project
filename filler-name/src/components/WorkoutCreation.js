import {
  useState
} from 'react';
import {
  API,
  createHeader
} from '../constants';
import './WorkoutCreation.css';
 
function WorkoutCreationForm(props) {
  const [state, setState] = useState({
    name: '',
    image: '',
    second_image: '',
    muscleGroup: '',
    type: '',
    difficulty: '',
    equipment: '',
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
    if(isNaN(state.difficulty) || state.difficulty > 5 || state.difficulty < 1)
      return;
    state.difficulty = Number(state.difficulty);
    let form = new FormData();
    Object.entries(state).forEach(entry => form.append(entry[0], entry[1]));
    await API.post('/upload', form, createHeader(props.jwt));
    window.location.href = '/home';
  }
 
  const handleImageChange = async event => {
    event.preventDefault();
    console.log(state);
    const { id, files } = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: files[0] ?? null
    }));
  }
 
  const inputStyle = {
    display: 'block',
    padding: '10px'
  };
 
  return (
    <form className="workout-creation">
      <label style={inputStyle} htmlFor="name">Name:</label>
      <input style={inputStyle} type="text" id="name" placeholder="Enter Workout Name" value={state.name} onChange={handleChange} />
      <label style={inputStyle} htmlFor="image">Image:</label>
      <input style={inputStyle} type="file" id="image" placeholder="Workout Image" onChange={handleImageChange} />
      <label style={inputStyle} htmlFor="second_image">Image:</label>
      <input style={inputStyle} type="file" id="second_image" placeholder="Another Workout Image" onChange={handleImageChange} />
      <label style={inputStyle} htmlFor="muscleGroup">Muscle Group:</label>
      <input style={inputStyle} type="text" id="muscleGroup" placeholder="Muscle Group Used" value={state.muscleGroup} onChange={handleChange} />
      <label style={inputStyle} htmlFor="type">Type:</label>
      <input style={inputStyle} type="text" id="type" placeholder="Type of Exercise" value={state.type} onChange={handleChange} />
      <label style={inputStyle} htmlFor="muscleGroup">Difficulty:</label>
      <input style={inputStyle} type="text" id="difficulty" placeholder="Difficulty (1-5)" value={state.difficulty} onChange={handleChange} />
      <label style={inputStyle} htmlFor="muscleGroup">Equipment:</label>
      <input style={inputStyle} type="text" id="equipment" placeholder="Equipment Required" value={state.equipment} onChange={handleChange} />
      <label style={inputStyle} htmlFor="description">Description:</label>
      <textarea style={inputStyle} id="description" placeholder="Describe Your Workout" value={state.description} onChange={handleChange} />
      <input style={inputStyle} type="submit" value="Create" onClick={handleSubmit} />
    </form>
  );
}
 
 
// return (
//   <form className="workout-creation">
 
//     <label style={inputStyle} htmlFor="name">Name:</label>
//     <label className="custom-field">
//       <input type="text" required id = "name" value={state.name} onChange={handleChange}/>
//       <span className="placeholder">Enter Workout Name</span>
//     </label>
 
//     <label style={inputStyle} htmlFor="muscleGroup">Muscle Group:</label>
//     <label className="custom-field">
//       <input type="text" required id = "muscleGroup" value={state.muscleGroup} onChange={handleChange}/>
//       <span className="placeholder">Enter Muscle Group</span>
//     </label>
 
//     <label style={inputStyle} htmlFor="type">Type:</label>
//     <label className="custom-field">
//       <input type="text" required id = "type" value={state.type} onChange={handleChange}/>
//       <span className="placeholder">Type of Exercise</span>
//     </label>
 
//     <label style={inputStyle} htmlFor="muscleGroup">Difficulty:</label>
//     <label className="custom-field">
//       <input type="text" required id = "difficulty" value={state.difficulty} onChange={handleChange}/>
//       <span className="placeholder">Difficulty (1-5)</span>
//     </label>
 
//     <label style={inputStyle} htmlFor="muscleGroup">Equipment:</label>
//     <label className="custom-field">
//       <input type="text" required id = "equipment" value={state.equipment} onChange={handleChange}/>
//       <span className="placeholder">Equipment Required</span>
//     </label>
 
//     <label style={inputStyle} htmlFor="description">Description:</label>
//     <label className="custom-field">
//       <input type="text" required id = "description" value={state.description} onChange={handleChange}/>
//       <span className="placeholder">Describe your workout</span>
//     </label>
 
//     <label style={inputStyle} htmlFor="image">Image:</label>
//     <input type="file" id="image" placeholder="Workout Image" onChange={handleImageChange} />
//     <label style={inputStyle} htmlFor="second_image">Image:</label>
//     <input type="file" id="second_image" placeholder="Another Workout Image" onChange={handleImageChange} />
//     <input style={inputStyle} type="submit" value="Create" onClick={handleSubmit} />
//   </form>
// );
// }
 
export default WorkoutCreationForm;
 

