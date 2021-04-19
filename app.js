'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rootRoute = require('./routes/rootRoute');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');
const app = express();
const port = 3000;
const loggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/form');
    }
  };
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('week2_public_html'));
app.use(express.static('uploads'));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });
//test
// modify app.get('/secret',...
app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

// routes
// app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
