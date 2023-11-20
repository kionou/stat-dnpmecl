<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="test.css">
    <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/drilldown.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <title>Mpme par region</title>
    <style>
*{

margin: 0;
padding: 0;
box-sizing: border-box;
}

.highcharts-figure{

/* border: 1px solid red; */
height: 100vh;

}

#container{

/* border: 1px solid blue; */
height: 100%;
}
    </style>
</head>
<body>
    <figure class="highcharts-figure" >
        <div id="container" ></div>
       
    </figure>
    <script >

const apiUrl = "https://mpme-guinee.com/bd/public/api/regions";

async function fetchData() {
  try {
      // Construction de l'URL avec les paramètres
      const apiUrlWithParams = new URL(apiUrl);
      apiUrlWithParams.searchParams.append('with_relation', true);

      // Utilisation de fetch avec l'URL complète
      const response = await fetch(apiUrlWithParams);
      const data = await response.json();
      console.log('response', data.data.data);
      return data.data.data; // Retourne uniquement la partie 'data' de la réponse
  } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
  }
}

async function createChart() {
  const apiData = await fetchData();

  const categories   = apiData.map(entry => entry.region ? entry.region.NomRegion : '');
  const seriesData = apiData.map(entry => entry.nbre);
 
const configurationGraphique = {
  chart: {
      renderTo: 'container',
      type: 'column'
  },
  title: {
      text: 'Nombre mpme par région'
  },
  xAxis: {
      categories: categories, // Noms des régions sur l'axe X
      title: {
          text: 'Régions'
      }
  },
  yAxis: {
      title: {
          text: 'Nombre mpme'
      },
      tickInterval: 2000 

  },
  series: [{
      name: 'Nombre',
      colorByPoint: true,
      data: seriesData // Nombres sur l'axe Y
  }]
};
  const monGraphique = new Highcharts.Chart(configurationGraphique);
}

createChart();
    </script>
</body>
</html>