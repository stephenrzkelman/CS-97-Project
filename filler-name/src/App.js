import {
  Profile
} from './components';
import {
  useState
} from 'react';

function App() {

  const [JWT, setJWT] = useState(window.localStorage.getItem('jwt'));

  return (
    <Profile jwt={JWT} />
  );
}

export default App;