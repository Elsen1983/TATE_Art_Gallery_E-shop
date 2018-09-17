// cb - call back

const sqlite3 = require('sqlite3').verbose();
//change it from later.sqlite to database.db when I build up database
const dbName = 'database.db';
//connect to a database file
const db = new sqlite3.Database(dbName);

//remove it when use dtabase.db because I dont have to create a database because that is exist there
// db.serialize(() =>{
//     //creates an "articles" table if there isn't one
//     const sql = `
//         CREATE TABLE IF NOT EXISTS articles
//         (id integer primary key, title, content TEXT)
//     `;
//     db.run(sql);
// });

//change article to Artworks from Article
class Artworks {

    //fetches all articles
    static all(cb){
        //db.all('SELECT * FROM artwork', cb);
        //had a problem here when deleted the OFFSET 200 -> first record was empty in database
        db.all('SELECT * FROM artwork WHERE id IN (SELECT id FROM artwork ORDER BY RANDOM() LIMIT 15)',  cb);
    }
    //select a specific article
    static find(id, cb){
        db.get('SELECT * FROM artwork WHERE id=?', id, cb);
    }

    static create(data, cb){
        //removed (title,content)
        const sql = 'INSERT INTO artwork() VALUES (?, ?)';
        //specifies parameters with question marks
        db.run(sql, data.name, data.content, cb);
    }

    static delete(id, cb){
        if(!id) return cb (new Error ('Please provide an id'));
        db.run('DELETE FROM artwork WHERE id=?', id, cb);
    }

}
class Artists {

    //fetches all articles
    static all(cb){
        //db.all('SELECT * FROM artwork', cb);
        //had a problem here when deleted the OFFSET 200 -> first record was empty in database
        db.all('SELECT * FROM artists WHERE name IS NOT NULL AND name != "" LIMIT 250',  cb);
    }
    //select a specific article
    static find(name, cb){
        db.get('SELECT * FROM artists WHERE name=?', name, cb);
    }

    static create(data, cb){
        //removed (title,content)
        const sql = 'INSERT INTO artwork() VALUES (?, ?)';
        //specifies parameters with question marks
        db.run(sql, data.name, data.content, cb);
    }

    static delete(id, cb){
        if(!id) return cb (new Error ('Please provide an id'));
        db.run('DELETE FROM artwork WHERE id=?', id, cb);
    }

}

module.exports = db;
module.exports.Artworks = Artworks;
module.exports.Artists = Artists;