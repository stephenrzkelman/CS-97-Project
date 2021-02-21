const express = require('express');
const bodyParser = require('body-parser');
const { User, Exercise, Tag, ExerciseTag } = require('../database');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

/* initialize database */
User.createTable();
Exercise.createTable();
Tag.createTable();
ExerciseTag.createTable();

/* most of these endpoints are just for debugging */

app.get('/', (req, res) => {
  return res.send('hello, world!');
});

app.get('/users/:userId/exercises', async (req, res) => {
  const { userId } = req.params;
  // const user = await (new User('test', 'testpass', 'test@gmail.com')).save();
  // const exercise = new Exercise('aaa', 'aaaaaaaaaaaaaa', user);
  // exercise.save();
  return res.send(await (await User.find(userId)).getExercises());
});

app.get('/users', async (req, res) => {
  return res.send(await User.all());
});

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  return res.send(await User.find(userId));
});

app.get('/exercises/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;
  return res.send(await Exercise.find(exerciseId));
});

app.get('/exercises', async (req, res) => {
  return res.send(await Exercise.all());
});

app.get('/tags', async (req, res) => {
  return res.send(await Tag.all());
});

app.get('/tags/:tagId', async (req, res) => {
  const { tagId } = req.params;
  return res.send(await Tag.find(tagId));
});

app.listen(port, () => console.log('ready'));