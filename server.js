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

app.get('/admin', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html><head><title>Résultats Quiz</title>
    <style>body{font-family:system-ui;margin:40px;background:#f8f9fa}table{width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1)}th,td{padding:15px;text-align:left;border-bottom:1px solid #eee}th{background:#007bff;color:white}h1{font-size:2em;color:#333;text-align:center;margin-bottom:30px}</style>
    </head><body>
    <h1>📊 Résultats Quiz Succession (${results.length})</h1>
    <table>
      <tr><th>Nom Complet</th><th>Téléphone</th><th>Sentiment (Q1)</th><th>Date</th></tr>`;
  results.slice(-20).reverse().forEach(r => {
    html += `
      <tr>
        <td>${r.json?.fullName || 'N/A'}</td>
        <td>${r.json?.phone || 'N/A'}</td>
        <td>${r.json?.q1_sentiment || 'N/A'}</td>
        <td>${r.time?.slice(0,16) || 'N/A'}</td>
      </tr>`;
  });
  html += `
    </table>
    <p style="text-align:center;margin-top:30px">
      <a href="/" style="background:#28a745;color:white;padding:12px 24px;text-decoration:none;border-radius:6px">← Tester Quiz</a>
    </p>
    </body></html>`;
  res.send(html);
});


const port = process.env.PORT || 10000;
app.listen(port, () => console.log('Quiz backend live'));
