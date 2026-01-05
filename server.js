const express = require('express');
const cors = require('cors');
app = express();
app.use(cors());
app.use(express.json());

let results = [];

app.post('/results', (req, res) => {
  results.push(req.body);
  res.json({success: true});
});

app.get('/admin', (req, res) => res.json(results));

const port = process.env.PORT || 10000;
app.listen(port, () => console.log('Quiz backend live'));
