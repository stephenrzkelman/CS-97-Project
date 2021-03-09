const { db } =  require('./db');
const { Exercise } = require('./Exercise');
const { User } = require('./User');

/**
 * user-exercise join table wrapper
 * acts to restrict each exercise to one like per user
 */

class ExerciseLike {

  /**
   * creates new instance of ExerciseLike
   * @param {Exercise} exercise must include id
   * @param {User} user must include id
   */

  constructor(exercise, user) {
    this.row_id = undefined;
    this.exercise = exercise;
    this.user = user;
  }

  save() {
    const that = this;
    const sql = `INSERT INTO exercise_like
      (exercise_id, user_id)
      VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.exercise.id, this.user.id], function(error) {
        if(error) {
          console.error(error);
          reject(error);
        }
        that.row_id = this.lastID;
        resolve(that);
      });
    });
  }

  static createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS exercise_like (
      row_id INTEGER PRIMARY KEY,
      exercise_id INTEGER,
      user_id INTEGER,
      FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE
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
    const sql = `SELECT * FROM exercise_like`;
    return new Promise((resolve, reject) => {
      db.all(sql, (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        const exercise_likes = Promise.all(rows.map(async row => {
          const exercise = await Exercise.find(row.exercise_id);
          const user = await User.find(row.user_id);
          const exercise_like = new ExerciseLike(exercise, user);
          exercise_like.row_id = row.row_id;
          return exercise_like;
        }));
        resolve(exercise_likes);
      });
    });
  }

  /**
   * #### exists here to avoid more circular dependency
   * gets all users who liked a given exercise
   * @param {Exercise} exercise must include id
   * @returns {Promise<User[]>}
   */

  static getExerciseLikes(exercise) {
    const sql = `SELECT * FROM exercise_like
      JOIN users ON exercise_like.user_id = users.id
      WHERE exercise_id = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, [exercise.id], (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        const users = rows.map(row => {
          const user = new User(row.username, row.password, row.email);
          user.id = row.id;
          return user;
        });
        resolve(users);
      });
    });
  }

  /**
   * #### exists here to avoid more circular dependency
   * gets all exercises for a given user including whether liked
   * @param {User} user must include id
   * @returns {Promise<Exercise[]}
   */

  static getUserFeed(user) {
    const sql = `SELECT * FROM exercises
      LEFT JOIN exercise_like ON exercise_like.exercise_id = exercises.id
      AND user_id = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, [user.id], (error, rows) => {
        console.log(rows);
        if(error) {
          console.error(error);
          reject(error);
        }
        resolve(Promise.all(rows.map(async row => {
          const exercise = await Exercise.find(row.id);
          exercise.liked = Boolean(row.exercise_id);
          return exercise;
        })));
      });
    });
  }

    /**
   * #### exists here to avoid more circular dependency
   * gets all exercises created by a given user including whether liked
   * @param {User} user must include id
   * @returns {Promise<Exercise[]}
   */

     static getUserWorkouts(user) {
      const sql = `SELECT * FROM exercises
        LEFT JOIN exercise_like ON exercise_like.exercise_id = exercises.id
        AND user_id = ?`;
      return new Promise((resolve, reject) => {
        db.all(sql, [user.id], (error, rows) => {
          if(error) {
            console.error(error);
            reject(error);
          }
          resolve(Promise.all(rows.filter(row => row.creator === user.id).map(async row => {
            const exercise = await Exercise.find(row.id);
            exercise.liked = Boolean(row.exercise_id);
            return exercise;
          })));
        });
      });
    }

  delete() {
    const sql = `DELETE FROM exercise_like
      WHERE exercise_id = ?
      AND user_id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.exercise.id, this.user.id], error => {
        if(error) {
          console.error(error);
          reject(error);
        }
      });
      resolve();
    });
  }
}

exports.ExerciseLike = ExerciseLike;