require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/users');

require('./db');

const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/users', userRoutes);
app.use('/api/income', require('./routes/income'));
app.use('/api/expenses', require('./routes/expenses'));

// error handling middleware
app.use((err, req, res, next) => {
  res.status(400);
  res.send({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
