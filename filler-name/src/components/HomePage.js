import {
  WorkoutCreationForm
} from '.';
import Feed from './Feed';

function HomePage(props) {
  return (
    <>
      <h1>Home Page</h1>
      {props.authenticated &&
	      <Feed/>
        //<WorkoutCreationForm jwt={window.localStorage.getItem('jwt')} />
      }
    </>
  );
}

export default HomePage;
