import {
  Feed,
  Profile,
  Calendar,
  Navigation,
  AuthForm,
  Logout,
  Signup,
  HomePage
} from './components';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {
  useState
} from 'react';

function App() {

  const [authenticated, authenticate] = useState(Boolean(localStorage.getItem('jwt')));

  return (
    <div className="App">
        <Router>
          <Navigation authenticated={authenticated} />
          <Switch>
            <Route
              exact path="/home"
              render={props => (
                <HomePage {...props} authenticated={authenticated} />
              )}
            />
            <Route
              path="/profile"
              render={props => (
                <Profile {...props} jwt={authenticated ? localStorage.getItem('jwt') : undefined} />
              )}
            />
            <Route
              path="/calendar"
              render={props => (
                <Calendar {...props} token={window.localStorage.getItem('jwt')} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <AuthForm {...props} authenticate={authenticate} />
              )}
            />
            <Route
              path="/logout"
              render={props => (
                <Logout {...props} authenticate={authenticate} />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <Signup {...props} authenticate={authenticate} />
              )}
            />
            <Route path="/feed" component={Feed} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
