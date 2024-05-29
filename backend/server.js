require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const apiRoutes = require('./routes/apiRoutes');
const requestLogger = require('./middleware/requestLogger'); // Import the middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3001', // Change this to the URL of your frontend
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'test' && password === 'password') {
      return done(null, { id: 1, username: 'test' });
    } else {
      return done(null, false);
    }
  }
));

app.use(passport.initialize());

// Use the requestLogger middleware
app.use(requestLogger);

app.use('/api', apiRoutes);

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'You have accessed a protected endpoint!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
