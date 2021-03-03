import {
  useState,
  useEffect
} from 'react';
import {
  API,
  createHeader
} from '../constants';
import {
  FeedPost
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
      <h1>welcome {state.user.username}</h1>
      {state.exercises.map(exercise => (
        <FeedPost
          key={exercise.id}
          id={exercise.id}
          likes={exercise.likes}
          name={exercise.name}
          difficulty={exercise.difficulty}
          image={exercise.image}
          type={exercise.type}
          muscleGroup={exercise.muscleGroup}
          equipment={exercise.equipment}
        />
      ))}
    </> :
    <>
      <h1>loading...</h1>
    </>
}

export default Profile;