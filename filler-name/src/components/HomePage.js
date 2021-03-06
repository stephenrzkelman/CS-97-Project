import {
  WorkoutCreationForm
} from '.';

function HomePage(props) {
  return (
    <>
      <h1>Home Page</h1>
      {props.authenticated &&
        <WorkoutCreationForm jwt={window.localStorage.getItem('jwt')} />
      }
    </>
  );
}

export default HomePage;