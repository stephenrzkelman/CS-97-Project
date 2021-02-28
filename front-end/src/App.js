import './App.css';

import FeedPost from './Components/FeedPost';
import GreyBox from './Temp/Gray-Box-2.jpg';
import curl2 from './Temp/curl2.jpg';

//this is temporary until a database is implemented
const postInfo = [
{
  accountName: 'Filler',
  image: GreyBox,
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
]



//what is shown on the webpage
function App() {
  return (
    <div className="App">
      {
        postInfo.map(post => {
          return <FeedPost
            accountName={post.accountName}
            image={post.image}
            muscleGroup={post.muscleGroup}
            type={post.type}
            equiptment={post.equiptment}
            diffuculty={post.diffuculty}
            />
        })
      }
    </div>
  );
}

export default App;
