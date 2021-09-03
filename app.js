const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const noteclubRoutes = require('./routes/noteclubRoutes');
const dbconfig = require("./dbconfig.json");

// express app
const app = express();

// connect to mongodb & listen for requests
// DB Connection
mongoose.connect(
  dbconfig.mongoPass,
  { useNewUrlParser: true  },
  () => console.log('connected to db')
);


// Listener
app.listen(process.env.PORT || 5000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/noteclub');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// noteclub routes
app.use('/noteclub', noteclubRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});