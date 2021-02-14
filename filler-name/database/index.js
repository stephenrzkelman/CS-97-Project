const { db } = require('./db');
const { User } = require('./User');
const { Exercise } = require('./Exercise');
const { Tag } = require('./Tag');
const { ExerciseTag } = require('./ExerciseTag');

module.exports = {
  ExerciseTag,
  Exercise,
  User,
  Tag,
  db
}