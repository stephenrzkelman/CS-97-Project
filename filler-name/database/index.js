const { db } = require('./db');
const { User } = require('./User');
const { Exercise } = require('./Exercise');
const { ExerciseLike } = require('./ExerciseLikes');
const { Event } = require('./Event');

module.exports = {
  ExerciseLike,
  Exercise,
  Event,
  User,
  db
}