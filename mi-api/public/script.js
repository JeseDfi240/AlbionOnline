async function cargarDatos() {
  try {
    const res = await fetch('/gold');
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Error:", data);
      return;
    }

    const precios = data.map(d => d.price);
    const fechas = data.map(d => new Date(d.timestamp).toLocaleTimeString());

    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [{
          label: 'Precio del oro',
          data: precios,
          borderWidth: 2
        }]
      }
    });

  } catch (error) {
    console.error(error);
  }
}

cargarDatos();