import './Feed.css';
import {
  useState,
  useEffect
} from 'react';
import {
  FeedPost
} from '.';
import {
  API,
  createHeader
} from '../constants';
import SearchBar from './SearchBar';
 
//temporary
/*
import curl2 from '../assets/curl2.jpg'
import BackgroundImage from '../assets/gray.jpg'

const postInfo = [
{
  name: 'Filler',
  image: BackgroundImage,
  image2: BackgroundImage,
  muscleGroup: 'Empty',
  type: 'Empty',
  equipment: 'Empty',
  diffuculty: 'Empty',
},
{
  name: 'Dumbell Hammer Curls',
  image: curl2,
  image2: BackgroundImage,
  muscleGroup: 'Bicpes',
  type: 'Strength',
  equipment: 'Dumbells',
  diffuculty: 'Beginner',
  directions: 'aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
}
] 
*/

//what is shown on the webpage
function Feed (){
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setResults] = useState([]);


  useEffect(async () => {
    if(!loading) return;
    setLoading(false);
    const posts = await API.get('/@me/exercises', createHeader(window.localStorage.getItem('jwt')));
    setState(posts.data);
  });


  const displayResult = data => {
    setResults(data);
  }

  return (
	  <div>
	  <SearchBar displayResult={displayResult}/>
    {searchResults.map(result => (
      <div key={result.id}>
        <h1>{result.name}</h1>
      </div>
    ))}

    <div className="App">
      {
        state.map(post => {
          return <FeedPost
            id={post.id}
            name={post.name}
            image={post.image}
            image2={post.image2}
            likes={post.likes}
            liked={post.liked}
            likeable={true}
            muscleGroup={post.muscleGroup}
            type={post.type}
            equipment={post.equipment}
            difficulty={post.difficulty}
            directions={post.directions}
            />
        })
      }
    </div>
  </div>
  );
}

export default Feed;
