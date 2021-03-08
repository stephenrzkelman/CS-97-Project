const { db } = require('./db');

class Exercise {

  /**
   * creates new instance of Exercise
   * @param {string} name name of exercise
   * @param {string} image image file (from filesystem)
   * @param {string} image2 second image
   * @param {string} muscleGroup muscle group worked
   * @param {string} type type of the workout
   * @param {number} difficulty difficulty rating of the workout
   * @param {string} instructions workout instructions
   * @param {string} date date of object creation
   * @param {string} description how to do the workout
   * @param {User} creator user which created the exercise
   */

  constructor(name, image, image2, muscleGroup, type, difficulty, equipment, description, creator) {
    this.id = undefined;
    this.name = name;
    this.likes = 0;
    this.image = image;
    this.image2 = image2;
    this.muscleGroup = muscleGroup;
    this.type = type;
    this.difficulty = difficulty;
    this.equipment = equipment;
    this.date = new Date();
    this.description = description;
    this.creator = creator;
  }

  /**
   * inserts a new exercise into table
   * @returns {Promise<Exercise>} instance of Exercise that called the method + id
   */

  save() {
    const that = this;
    that.image = this.image == null ? 'Gray-Box-2.jpg' : this.image;
    that.image2 = this.image2 == null ? 'Gray-Box-2.jpg' : this.image2;
    const sql = `INSERT INTO exercises
      (name, likes, image, image2, muscleGroup, type, difficulty, equipment, date, description, creator)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.name, this.likes, that.image, that.image2, this.muscleGroup, this.type, this.difficulty, this.equipment, this.date.toISOString(), this.description, this.creator.id], function(error) {
        if(error) {
          console.error(error);
          reject(error);
        }
        that.id = this.lastID;
        resolve(that);
      });
    });
  }

  /**
   * increments likes of exercise
   * @returns {Promise<Exercise>} calling instance
   */

  updateRating() {
    const sql = `UPDATE exercises SET likes = likes + 1 WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.id], error => {
        if(error) {
          console.error(error);
          reject(error);
        }
        this.likes += 1;
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
      likes INTEGER NOT NULL,
      image TEXT NOT NULL,
      image2 TEXT NOT NULL,
      muscleGroup TEXT NOT NULL,
      type TEXT NOT NULL,
      difficulty REAL,
      equipment TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
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
        const { User } = require('./User');
        const exercises = Promise.all(rows.map(async row => {
          const creator = await User.find(row.creator);
          const exercise = new Exercise(
            row.name,
            row.image,
            row.image2,
            row.muscleGroup,
            row.type,
            row.difficulty,
            row.equipment,
            row.description,
            creator
          );
          exercise.id = row.id;
          exercise.likes = row.likes;
          exercise.date = new Date(row.date);
          return exercise;
        }));
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
        const exercise = new Exercise(
          row.name,
          row.image,
          row.image2,
          row.muscleGroup,
          row.type,
          row.difficulty,
          row.equipment,
          row.description,
          await User.find(row.creator));
        exercise.id = row.id;
        exercise.likes = row.likes;
        exercise.date = new Date(row.date);
        resolve(exercise);
      });
    });
  }

  /**
   * searches database for exercises meeting keyword
   * @param {string} query keyword to search for
   * @returns {Promise<Exercise>[]}
   */

  static search(query) {
    const sql = `SELECT * FROM exercises
      WHERE name LIKE ? COLLATE NOCASE OR
            musclegroup LIKE ? COLLATE NOCASE OR
            type LIKE ? COLLATE NOCASE OR
            equipment LIKE ? COLLATE NOCASE
            description LIKE ? COLLATE NOCASE`;
    return new Promise((resolve, reject) => {
      db.all(sql, Array(4).fill(`%${query}%`), (error, rows) => {
      if(error) {
          console.error(error);
          reject(error);
        }
        const { User } = require('./User');
        const exercises = Promise.all(rows.map(async row => {
          const creator = await User.find(row.creator);
          const exercise = new Exercise(
            row.name,
            row.image,
            row.image2,
            row.muscleGroup,
            row.type,
            row.difficulty,
            row.equipment,
            row.description,
            creator
          );
          exercise.id = row.id;
          exercise.likes = row.likes;
          exercise.date = new Date(row.date);
          return exercise;
        }));
        resolve(exercises);
      });
    });
  }

  /**
   * decreases rating of exercise
   * @returns {Promise<Exercise>}
   */

  decreaseRating() {
    const sql = `UPDATE exercises SET likes = likes - 1 WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.id], error => {
        if(error) {
          console.error(error);
          reject(error);
        }
        this.likes -= 1;
        resolve(this);
      });
    });
  }
}

exports.Exercise = Exercise;
