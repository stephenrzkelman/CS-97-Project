const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { db, User, Exercise, ExerciseLike, Event } = require('../database');

const app = express();
const port = 3000;
const JWT_SECRET = 'dtrgyuhijohuttfcghvjbkhvdt';

app.use(bodyParser.json());
const auth = (req, res, next) => {
  req.jwt = req.headers.authorization;
  return next();
};
app.use(auth);

/* initialize database */
User.createTable();
Exercise.createTable();
ExerciseLike.createTable();
Event.createTable();

/* most of these endpoints are just for debugging */

app.get('/', (req, res) => {
  return res.send('hello, world!');
});

app.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.authenticate(email, password);
  if(!user) return res.status(401).json({
    error: 'invalid-credentials'
  });
  const token = jwt.sign(user, JWT_SECRET);
  return res.json({
    token: token
  });
});

app.get('/test', async (req, res) => {
  return res.json(await ExerciseLike.getUserLikes({id: 1}));
});

app.get('/users/:userId/exercises', async (req, res) => {
  const { authorization } = req.headers;
  const { userId } = req.params;
  if(!authorization) return res.status(401);
  const userExercises = await (await User.find(Number(userId))).getExercises();
  return res.json(userExercises);
});

app.get('/@me', async (req, res) => {
  const user = jwt.verify(req.jwt, JWT_SECRET);
  return res.json(user);
});

app.get('/@me/events', async (req, res) => {
  const user = jwt.verify(req.jwt, JWT_SECRET);
  return res.json(await Event.getUserEvents(user));
});

app.post('/events', async (req, res) => {
  const user = jwt.verify(req.jwt, JWT_SECRET);
  const event = await (new Event(req.body.id, req.body.title, req.body.start, user)).save();
  return res.json({message: 'ok'});
});

app.get('/events', async (req, res) => {
  return res.json(await Event.all());
});

app.get('/users', async (req, res) => {
  return res.send(await User.all());
});

app.post('/users', async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User(username, password, email);
  const resp = await user.save();
  return res.json({token: jwt.sign({
    id: resp.id,
    username: resp.username,
    password: resp.password,
    email: resp.email
  }, JWT_SECRET)});
});

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  return res.send(await User.find(userId));
});

app.get('/exercises/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;
  return res.send(await Exercise.find(exerciseId));
});

app.put('/exercises/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;
  const obj = jwt.verify(req.jwt, JWT_SECRET);
  const user = new User(obj.username, obj.password, obj.email);
  user.id = obj.id;
  let exercise = await Exercise.find(exerciseId);

  let execLike = await (new ExerciseLike(exercise, user)).save();
  return res.json(await exercise.updateRating());
});

app.get('/exercises', async (req, res) => {
  return res.json(await Exercise.all());
});

app.get('/@me/exercises', async (req, res) => {
  const obj = jwt.verify(req.jwt, JWT_SECRET)
  const user = new User(obj.username, obj.password, obj.email);
  user.id = obj.id;
  const likedExercises = await ExerciseLike.getUserLikes(user);
  const allExercises = await Exercise.all();
  allExercises.forEach(exer => {
    if(likedExercises.map(elem => elem.id).includes(exer.id))
      exer.liked = true;
    else exer.liked = false;
  });
  return res.send(allExercises);
});

/* app.post('/exercises', auth, async (req, res) => {
  const { name, description } = req.body;
  let bearer = jwt.verify(req.jwt, JWT_SECRET);
  const exercise = await (new Exercise(name, description, bearer)).save();
  return res.json(exercise);
}); */

app.listen(port, () => console.log('ready'));