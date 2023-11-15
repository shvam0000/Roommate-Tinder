const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/healthcheck', (req, res) => {
  res.send('API Works');
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
