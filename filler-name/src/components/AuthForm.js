import { useState } from 'react';
import { API, createHeader } from '../constants';

function AuthForm(props) {
  const [state, setState] = useState({
    email: '',
    password: ''
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
    const response = await API.post('/auth', state, createHeader(null));
    window.localStorage.setItem('jwt', response.data.token);
    // refresh or change uri to home page
  }

  const inputStyle = {
    display: 'block',
    padding: '10px'
  };

  return (
    <form>
      <label style={inputStyle} htmlFor="email">Email</label>
      <input style={inputStyle} type="email" id="email" placeholder="Email" onChange={handleChange} />
      <label style={inputStyle} htmlFor="password">Password</label>
      <input style={inputStyle} type="password" id="password" placeholder="Password" onChange={handleChange} />
      <input type="submit" value="Log In" onClick={handleSubmit} />
    </form>
  );
}

export default AuthForm;