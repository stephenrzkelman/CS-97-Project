import './App.css';

import Navigation from './Navigation';
import Profile from './Profile';
import Home from './Components/Home';
import Calendar from './Calendar';
import Login from './Login';
import Logout from './Logout';
import Workout from './Workout';
import FeedPost from './Components/FeedPost';

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
          <Route path="/feed" component={FeedPost} />
          <Route path="/workout" component={Workout} />
          </Switch>
      </Router>

    </div>
  );
}

export default App;