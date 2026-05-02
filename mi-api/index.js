const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/gold', async (req, res) => {
  try {
    const response = await fetch('https://west.albion-online-data.com/api/v2/stats/gold.json?count=120');
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});
let historial = [];
async function guardarPrecio() {
  try {
    const response = await fetch('https://west.albion-online-data.com/api/v2/stats/gold.json?count=1');
    const data = await response.json();

    const precio = data[0];

    historial.push(precio);

    console.log("Guardado:", precio.price);

  } catch (error) {
    console.error("Error guardando:", error);
  }
}
setInterval(guardarPrecio, 60000);

app.get('/history', (req, res) => {
  res.json(historial);
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});