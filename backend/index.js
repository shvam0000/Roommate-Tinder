const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const userRoutes = require('./routes/users');

app.use('/user', userRoutes);

app.get('/check', (req, res) => {
  return res.status(200).json({ message: 'API working' });
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
