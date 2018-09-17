


//Started build up this Restful application based on chapter 3 description
// from Node.s in Action book

//implements routes by using a JavaScript array to store the articles
const express = require('express');
const app = express();
// remove it after add database --> const articles = [{ title: 'Example' }];
//loads the database module
//const Article = require('./db').Article;
const Artworks = require('./db').Artworks;
const Artists = require('./db').Artists;

//adding a body parser
const bodyParser = require('body-parser');

const read = require('node-readability');

app.set('port', process.env.PORT || 3000);

//support request bodies encoded as JSON
app.use(bodyParser.json());
//support from encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(
    '/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);
//post all articles --> until I build up the database
// app.post('/articles', (req, res) =>{
//     const article = {
//         title: req.body.title
//     };
//     articles.push(article);
//     res.send(article);
// });


//for homepage
app.get('/', (req, res, next) => {
    //biggest picture
    const id = '13782';
    //console.log('Fetching:', id); --> until I build up the database
    //next 2 line only if I build up database
    //find a specific article
    Artworks.find(id, (err, artwork) =>{
        if(err) return next(err);
        res.format({
            html: () => {
                res.render('homepage.ejs', { artwork });
            },
            json: () => {
                res.send(artwork);
            }
        });
    });
});

//get all articles
//change articles to artworks
app.get('/artworks', (req, res, next) => {
    //next 2 line only if I build up database
    Artworks.all((err, artwork) =>{
        if (err) return next(err);
        res.format({
            html: () => {
                res.render('artworks.ejs', { artwork });
            },
            json: () => {
                res.send(artwork);
            }
        });
    });
});

//creates an article --> until I build up the database
// app.post('/articles', (req, res, next) => {
//     res.send('OK');
// });


//gets a single article by id
//change article to artwork
app.get('/artworks/:id', (req, res, next) => {
    const id = req.params.id;
    //console.log('Fetching:', id); --> until I build up the database
    //next 2 line only if I build up database
    //find a specific article
    Artworks.find(id, (err, artwork) =>{
        if(err) return next(err);
        res.format({
            html: () => {
                res.render('artwork.ejs', { artwork });
            },
            json: () => {
                res.send(artwork);
            }
        });
    });
});


//deletes an article
app.delete('/artworks/:id', (req, res, next) => {
    const id = req.params.id;
    //console.log('Deleting:', id); --> until I build up the database
    //delete articles[id]; --> until I build up the database

    //next 2 line only if I build up database
    //delete an article
    Artworks.delete(id, (err) =>{
        if(err) return next (err);
        //res.send(articles[id]); --> until I build up the database
        res.send({
            message: 'Deleted'
        });
    });
});

app.post('/artworks', (req, res, next) => {
    //gets the URL from the POST body
    const url = req.body.url;
    //Uses the readability mode to fetch th URL
    read(url, (err, result) => {
        if (err || !result) res.status(500).send('Error downloading article');
        Artworks.create(
            { title: result.title, content: result.content },
            (err, artwork) => {
                if (err) return next(err);
                console.log(artwork);
                //after saving  the article, send back a 200 HTTP status code
                res.send('OK');
            }
        );
    });
});


//ARTISTS
//all
app.get('/artists', (req, res, next) => {
    //next 2 line only if I build up database
    Artists.all((err, artists) =>{
        if (err) return next(err);
        res.format({
            html: () => {
                res.render('artists.ejs', { artists });
            },
            json: () => {
                res.send(artists);
            }
        });
    });
});

//get 1 artist
app.get('/artists/:name', (req, res, next) => {
    const name = req.params.name;

    Artists.find(name, (err, artists) =>{
        if(err) return next(err);
        res.format({
            html: () => {
                res.render('artist.ejs', { artists });
            },
            json: () => {
                res.send(artists);
            }
        });
    });
});




app.listen(app.get('port'), () =>{
   console.log('App started on port', app.get('port'))
});
module.exports = app;
