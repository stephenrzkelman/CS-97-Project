import './App.css';
import { useState, useEffect } from 'react';
import { FeedPost, StarRating } from './components';
import { API, createHeader } from './constants';
/* const postInfo = [
{
  accountName: 'Filler',
  image: BackgroundImage,
  muscleGroup: 'Empty',
  type: 'Empty',
  equiptment: 'Empty',
  diffuculty: 'Empty',
},
{
  accountName: 'Dumbell Hammer Curls',
  image: curl2,
  muscleGroup: 'Bicpes',
  type: 'Strength',
  equiptment: 'Bumbells',
  diffuculty: 'Beginner',
}
] */

//what is shown on the webpage
function App() {

  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if(!loading) return;
    setLoading(false);
    const posts = await API.get('/exercises', createHeader(window.localStorage.getItem('jwt')));
    setState(posts.data);
  });

  return (
    <div className="App">
      {
        state.map(post => {
          return <FeedPost
            name={post.name}
            image={post.image}
            likes={post.likes}
            muscleGroup={post.muscleGroup}
            type={post.type}
            equipment={post.equipment}
            difficulty={post.difficulty}
            />
        })
      }
    </div>
  );
}

export default App;
