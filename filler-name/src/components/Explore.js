import './Feed.css';
import {
  useState,
  useEffect
} from 'react';
import {
  UserInfo
} from '.';
import {
  API,
  createHeader
} from '../constants';
import ExploreBar from './ExploreBar';

function Explore (){
  const [state, setState] = useState([]);
  const [users, setUsers] = useState(true);
  // change to false when we want to show a single selected
  // user's workouts
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if(!loading) return;
    setLoading(false);
    const posts = await API.get('/users', createHeader(window.localStorage.getItem('jwt')));
    setState(posts.data);
  });

  const displayResult = data => {
    setState(data);
  }

  // TODO: write a method, here or in UserInfo,
  // that will detect a click on a UserInfo component
  // and modify the content of this page so that users=false
  // and it shows all the posts of the selected user (using the id component)
  // rather than a list of all users/ a list of all users matching the search query

  return (
  <div>
    <ExploreBar displayResult={displayResult}/>

    <div className="App">
    {
        state.map(post => {
          return <UserInfo id={post.id} name={post.username}/>
        })
    }
    </div>
  </div>
  );
}

export default Explore;
