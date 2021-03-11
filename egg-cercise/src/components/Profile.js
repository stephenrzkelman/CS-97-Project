import {
  WorkoutCreationForm
} from '.';
import {
  useState,
  useEffect
} from 'react';
import {
  API,
  createHeader
} from '../constants';
import {
  FeedPost,
} from '../components';

function Profile(props) {

  const [state, setState] = useState({
    loading: true,
    user: null,
    exercises: null
  });

  useEffect(async () => {
    if(!state.loading) return;
    const { data } = await API.get('/@me', createHeader(props.jwt));
    const exercises = (await API.get(`/users/${data.id}/exercises`, createHeader(props.jwt))).data;
    setState({
      loading: false,
      user: data,
      exercises: exercises
    });
  });

  return state.user != null ?
    <>
      <h1>{state.user.username}'s Profile</h1>
      <p> Create a new exercise:</p>
      <WorkoutCreationForm jwt={window.localStorage.getItem('jwt')} />
      <h1> Your exercises: </h1>
      {state.exercises.map(exercise => (
        <FeedPost
          key={exercise.id}
          id={exercise.id}
          likes={exercise.likes}
          likeable={false}
          name={exercise.name}
          difficulty={exercise.difficulty}
          image={exercise.image}
          image2={exercise.image2}
          type={exercise.type}
          muscleGroup={exercise.muscleGroup}
          equipment={exercise.equipment}
          directions={exercise.description}
        />
      ))}
    </> :
    <>
      <h1>loading...</h1>
    </>
}

export default Profile;
