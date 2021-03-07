const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const path = require('path');
const uuid = require('uuid').v4;
const fs = require('fs');
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

app.post('/search', bodyParser.json(), async (req, res) => {
  return res.json(await Exercise.search(req.body.keyword));
});

app.post('/explore', bodyParser.json(), async(req,res) => {
	return res.json(await User.search(req.body.keyword));
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
  const allExercises = await ExerciseLike.getUserFeed(user);
  return res.send(allExercises);
});

app.post('/upload', async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const newname = uuid() + '.' + files.image.name.split('.')[1]
    const exercise = new Exercise(
      fields.name,
      newname,
      fields.muscleGroup,
      fields.type,
      fields.difficulty,
      fields.equipment,
      jwt.verify(req.jwt, JWT_SECRET)
    );
    await exercise.save();
    let oldpath = files.image.path;
    let newpath = `${path.join(__dirname, '../src/assets')}/${newname}`;
    let rawdata = fs.readFileSync(oldpath);
    fs.writeFile(newpath, rawdata, err => {
      if(err) console.error(err);
    });
  });
});

app.listen(port, () => console.log('ready'));
