const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Express middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page hbs2',
    welcomeMessage: 'Welcome message for home',
  });
});

app.get('/about', (req, res) => {
  // res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page hbs',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/bad', (req, res) => {
  res.send({ errorMessage: 'Bad man' });
});

app.listen(3000);
