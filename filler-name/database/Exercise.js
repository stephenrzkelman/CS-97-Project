const { db } = require('./db');

class Exercise {

  /**
   * creates new instance of Exercise
   * @param {string} name name of exercise
   * @param {string} description description (idk)
   * @param {User} creator user which created the exercise
   */

  constructor(name, description, creator) {
    this.id = undefined;
    this.name = name;
    this.description = description;
    this.rating = undefined;
    this.creator = creator;
  }

  /**
   * inserts a new exercise into table
   * @returns {Promise<Exercise>} instance of Exercise that called the method + id
   */

  save() {
    const that = this;
    const sql = `INSERT INTO exercises
      (name, description, rating, creator)
      VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.name, this.description, 0.0, this.creator.id], function(error) {
        if(error) {
          console.error(error);
          reject(error);
        }
        that.id = this.lastID;
        resolve(that);
      })
    })
  }

  /**
   * updates rating of exercise
   * @param {number} newRating new rating for exercise (1-5)
   * @returns {Promise<Exercise>} calling instance
   */

  updateRating(newRating) {
    const sql = `UPDATE exercises SET rating = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [newRating, this.id], error => {
        if(error) {
          console.error(error);
          reject(error);
        }
        resolve(this);
      });
    });
  }

  /**
   * creates new exercise table
   * @returns {Promise<void>} empty promise :(
   */

  static createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      rating REAL,
      creator INTEGER NOT NULL,
      FOREIGN KEY(creator) REFERENCES user(id) ON DELETE CASCADE
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

  /**
   * gets all exercises in the table
   * @returns {Promise<Exercise[]>} all exercises
   */

  static all() {
    const sql = `SELECT * FROM exercises`;
    return new Promise((resolve, reject) => {
      db.all(sql, (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        const exercises = rows.map(row => {
          const exercise = new Exercise(row.name, row.description);
          exercise.id = row.id;
          exercise.rating = row.rating;
          return exercise;
        });
        resolve(exercises);
      });
    })
  }

  /**
   * gets exercise object by id
   * @param {number} id exercise primary key
   * @returns {Promise<Exercise>}
   */

  static find(id) {
    const sql = `SELECT * FROM exercises WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [id], async (error, row) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        if(!row) return resolve();
        const { User } = require('./User');
        const exercise = new Exercise(row.name, row.description, await User.find(row.creator));
        exercise.id = row.id;
        resolve(exercise);
      });
    });
  }
}

exports.Exercise = Exercise;