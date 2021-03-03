import {
  useState
} from 'react';
import {
  withRouter
} from 'react-router-dom';
import {
  API,
  createHeader
} from '../constants';
import './AuthForm.css';

function Signup(props) {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    error: ''
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
    try {
      const response = await API.post('/users', state, createHeader(null));
      window.localStorage.setItem('jwt', response.data.token);
      props.authenticate(true);
      props.history.push('/home');
    } catch {
      let prevState = state;
      setState({
        username: prevState.username,
        email: prevState.email,
        password: prevState.password,
        error: 'invalid credentials'
      });
    }
  }

  const inputStyle = {
    display: 'block',
    padding: '10px'
  };

  return (
    <form className="authentication-form">
      <label style={inputStyle} htmlFor="username">Username</label>
      <input style={inputStyle} type="text" id="username" placeholder="Username" onChange={handleChange} />
      <label style={inputStyle} htmlFor="email">Email</label>
      <input style={inputStyle} type="email" id="email" placeholder="Email" onChange={handleChange} />
      <label style={inputStyle} htmlFor="password">Password</label>
      <input style={inputStyle} type="password" id="password" placeholder="Password" onChange={handleChange} />
      <p style={{color: 'red'}}>{state.error}</p>
      <input type="submit" value="Create Account" onClick={handleSubmit} />
    </form>
  );
}

export default withRouter(Signup);