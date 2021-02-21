const { db } =  require('./db');
const { Exercise } = require('./Exercise');
const { Tag } = require('./Tag');

/**
 * tag-exercise join table wrapper
 */

class ExerciseTag {

  /**
   * creates new instance of ExerciseTag
   * @param {Exercise} exercise must include id
   * @param {Tag} tag must include id
   */

  constructor(exercise, tag) {
    this.id = undefined;
    this.exercise = exercise;
    this.tag = tag;
  }

  save() {
    const that = this;
    const sql = `INSERT INTO exercise_tags
      (exercise_id, tag_id)
      VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.exercise.id, this.tag.id], function(error) {
        if(error) {
          console.error(error);
          reject(error);
        }
        that.id = this.lastID;
        resolve(that);
      });
    });
  }

  static createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS exercise_tags (
      id INTEGER PRIMARY KEY,
      exercise_id INTEGER,
      tag_id INTEGER,
      FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
      FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE
    )`;
    return new Promise((resolve, reject) => {
      db.run(sql, error => {
        if(error) {
          console.error(error);
          reject(error);
        }
        resolve();
      });
    });
  }

  static all() {
    const sql = `SELECT * FROM exercise_tags`;
    return new Promise((resolve, reject) => {
      db.all(sql, (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        const exercise_tags = Promise.all(rows.map(async row => {
          const exercise = await Exercise.find(row.exercise_id);
          const tag = await Tag.find(row.tag_id);
          const exercise_tag = new ExerciseTag(exercise, tag);
          exercise_tag.id = row.id;
          return exercise_tag;
        }));
        resolve(exercise_tags);
      });
    });
  }

  /**
   * #### exists here to avoid more circular dependency
   * gets all tags for a given exercise
   * @param {Exercise} exercise must include id
   * @returns {Promise<Tag[]>}
   */

  static getExerciseTags(exercise) {
    const sql = `SELECT * FROM exercise_tags
      JOIN tags ON exercise_tags.tag_id = tags.id
      WHERE exercise_id = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, [exercise.id], (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        const tags = rows.map(row => {
          const tag = new Tag(row.content);
          tag.id = row.id;
          return tag;
        });
        resolve(tags);
      });
    });
  }

  /**
   * #### exists here to avoid more circular dependency
   * gets all exercises for a given tag
   * @param {Tag} tag must include id
   * @returns {Promise<Exercise[]}
   */

  static getTagExercises(tag) {
    const sql = `SELECT * FROM exercise_tags
      JOIN exercises ON exercise_tags.exercise_id = exercises.id
      WHERE tag_id = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, [tag.id], (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        resolve(Promise.all(rows.map(async row => await Exercise.find(row.id))));
      });
    });
  }
}

exports.ExerciseTag = ExerciseTag;