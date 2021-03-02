import './App.css';

import {
  Feed,
  Profile,
  Calendar,
  Navigation
} from './components';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



//what is shown on the webpage
function App() {
  return (
    <div className="App">
        <Router>
        <Navigation />
          <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/feed" component={Feed} />
          <Route path="/workout" component={Workout} />
          </Switch>
      </Router>

    </div>
  );
}

export default App;