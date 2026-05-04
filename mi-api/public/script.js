async function cargarDatos() {
  try {
    const res = await fetch('/gold');
    const dataAPI = await res.json();

    if (!Array.isArray(dataAPI)) {
      console.error("Error:", dataAPI);
      return;
    }

    const datosInvertidos = [...dataAPI].reverse();

    const datosGrafica = datosInvertidos.map(d => {
      return {
        // Para datos con hora (intraday), Lightweight charts requiere el tiempo en "UNIX Timestamp" (segundos)

        time: Math.floor(new Date(d.timestamp).getTime() / 1000),
        value: d.price
      };
    });

    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      }
    };

    const container = document.getElementById('container');

    container.innerHTML = '';

    const chart = LightweightCharts.createChart(container, chartOptions);

    const series = chart.addSeries(LightweightCharts.LineSeries, {
      color: '#2962FF',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    const series2 = chart.addSeries(LightweightCharts.LineSeries, {
      color: '#16a900ff',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    series.setData(datosGrafica);
    series2.setData(datosGrafica.map(d => ({ time: d.time, value: d.value * 0.99865 })));

    let minimumPrice = datosGrafica[0].value;
    let maximumPrice = minimumPrice;
    for (let i = 1; i < datosGrafica.length; i++) {
      const price = datosGrafica[i].value;
      if (price > maximumPrice) maximumPrice = price;
      if (price < minimumPrice) minimumPrice = price;
    }
    const avgPrice = (maximumPrice + minimumPrice) / 2;

    series.createPriceLine({ price: minimumPrice, color: '#ef5350', lineWidth: 2, lineStyle: 2, title: 'min', axisLabelVisible: true });
    series.createPriceLine({ price: avgPrice, color: '#000', lineWidth: 2, lineStyle: 1, title: 'prom', axisLabelVisible: true });
    series.createPriceLine({ price: maximumPrice, color: '#26a69a', lineWidth: 2, lineStyle: 2, title: 'max', axisLabelVisible: true });

    chart.timeScale().fitContent();

  } catch (error) {
    console.error("Hubo un error cargando los datos:", error);
  }
}
cargarDatos();