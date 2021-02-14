const { db } = require('./db');

class Tag {

  /**
   * creates new instance of Tag
   * @param {string} content the tag itself
   */

  constructor(content) {
    this.id = undefined;
    this.content = content;
  }

  static createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY,
      content TEXT NOT NULL
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
   * @returns {Promise<Tag>}
   */

  save() {
    const sql = `INSERT INTO tags (content) VALUES (?)`;
    const that = this;
    return new Promise((resolve, reject) => {
      db.run(sql, [this.content], function(error) {
        if(error) {
          console.error(error);
          reject(error);
        }
        that.id = this.lastID;
        resolve(that);
      });
    });
  }

  static all() {
    const sql = `SELECT * FROM tags`;
    return new Promise((resolve, reject) => {
      db.all(sql, (error, rows) => {
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

  static find(id) {
    const sql = `SELECT * FROM tags WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [id], (error, row) => {
        if(error) {
          console.error(error);
          reject(error);
        }
        if(!row) return resolve();
        const tag = new Tag(row.content);
        tag.id = row.id;
        resolve(tag);
      });
    });
  }
}

exports.Tag = Tag;