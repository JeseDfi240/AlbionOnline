const express = require('express');
const app = express();


app.get('/gold', async (req, res) => {
  try {
    const response = await fetch('https://west.albion-online-data.com/api/v2/stats/gold.json?count=2');
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});