let miGrafica;

async function cargarDatos() {
  try {
    const res = await fetch('/gold');
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Error:", data);
      return;
    }

    const precios = data.map(d => d.price).reverse();
    const fechas = data.map(d => new Date(d.timestamp).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })).reverse();

    const ctx = document.getElementById('chart').getContext('2d');

    if (miGrafica) {
      miGrafica.destroy();
    }

    miGrafica = new Chart(ctx, {
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


document.getElementById('btnActualizar').addEventListener('click', cargarDatos);

cargarDatos();