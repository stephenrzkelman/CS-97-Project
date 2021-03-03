const { db } = require('./db');
const { User } = require('./User');
const { Exercise } = require('./Exercise');
const { Tag } = require('./Tag');
const { ExerciseTag } = require('./ExerciseTag');
const { ExerciseLike } = require('./ExerciseLikes');

module.exports = {
  ExerciseLike,
  ExerciseTag,
  Exercise,
  User,
  Tag,
  db
}