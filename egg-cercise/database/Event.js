const { db } = require('./db');
const { User } = require('./User');

class Event {

  /**
   * creates new instance of Calendar Event
   * @param {string} id something about the calendar api...?
   * @param {string} title name of event
   * @param {string} start modified ISO Date string
   * @param {User} creator event creator
   */

  constructor(id, title, start, creator) {
    this._id = undefined;
    this.id = id;
    this.title = title;
    this.start = start;
    this.creator = creator;
  }

  /**
   * inserts a new calendar event into table
   * @returns {Promise<Event>} instance of event that called the method + id
   */

  save() {
    const that = this;
    const sql = `INSERT INTO events
      (id, title, start, creator)
      VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.id, this.title, this.start, this.creator.id], function(error) {
        if(error) {
          console.error(error);
          reject(error);
        }
        that._id = this.lastID;
        resolve(that);
      });
    });
  }

  /**
   * creates new calendar event table
   * @returns {Promise<void>} empty promise :(
   */

  static createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS events (
      _id INTEGER PRIMARY KEY,
      id TEXT NOT NULL,
      title TEXT NOT NULL,
      start TEXT NOT NULL,
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
   * gets all events in the table
   * @returns {Promise<Event[]>} all exercises
   */

  static all() {
    const sql = `SELECT * FROM events`;
    return new Promise((resolve, reject) => {
      db.all(sql, (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        const events = Promise.all(rows.map(async row => {
          const creator = await User.find(row.creator);
          const event = new Event(
            row.id,
            row.title,
            row.start,
            creator
          );
          event._id = row._id;
          return event;
        }));
        resolve(events);
      });
    });
  }

  /**
   * gets calendar event object by id
   * @param {number} _id event primary key
   * @returns {Promise<Event>}
   */

  static find(_id) {
    const sql = `SELECT * FROM events WHERE _id = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [id], async (error, row) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        if(!row) return resolve();
        const event = new Event(
          row.id,
          row.title,
          row.start,
          await User.find(row.creator)
        );
        event._id = row._id;
        resolve(event);
      });
    });
  }

  /**
   * gets all calendar events created by a certain user
   * @param {User} user author of event
   */
  static getUserEvents(user) {
    const sql = `SELECT * FROM events WHERE creator = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, [user.id], (error, rows) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        const events = rows.map(row => {
          const event = new Event(
            row.id,
            row.title,
            row.start
          );
          delete event.creator;
          event._id = row._id;
          return event;
        });
        resolve(events);
      });
    });
  }
}

exports.Event = Event;