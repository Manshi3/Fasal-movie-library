const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

// npm install express ejs express-ejs-layouts body-parser dotenv axions bcr 

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(expressLayouts);
// app.set('base', './views/base');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set("view engine", "ejs");


const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const listRoutes = require('./routes/lists');
const indexRoutes = require('./routes/indexRouter');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/lists', listRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
