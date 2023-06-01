const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const createError = require('http-errors');
const db = require('./database');

const server = express();

// View engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// Middleware
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(flash());

server.use(session({ 
  secret: 'mangammaltemple1948',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Routes
server.get('/', (req, res) => {
    res.render('index', { title: 'Contact-Us' });
});
  
server.post('/contact', (req, res) => {
    const { name, mobile, email, location, suggestions } = req.body;
  
    const sql = `INSERT INTO contactus (name, mobile, email, location, suggestions, created_on) VALUES (?, ?, ?, ?, ?, NOW())`;
    const values = [name, mobile, email, location, suggestions]

    db.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('records inserted');
      req.flash('success', 'Data added successfully!');
      res.redirect('/');
    });
});

// Error handling
server.use((req, res, next) => {
    next(createError(404));
});

server.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
});

// Start the server
const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`Node Server is running on port ${PORT}`);
});

module.exports = server;