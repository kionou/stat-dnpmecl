console.log('bonjour le monde des vivants');


  // Data retrieved from https://gs.statcounter.com/browser-market-share#monthly-202201-202201-bar

// Create the chart
// URL de votre API
const apiUrl = "https://mpme-guinee.com/bd/public/api/regions";

// Fonction pour récupérer les données depuis l'API
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

function normaliserValeurs(valeurs) {
    const echelleMaximale = 10000; // Plage de chaque tranche
    return valeurs.map(valeur => valeur % echelleMaximale);
}
// Fonction pour créer et afficher le graphique Highcharts
async function createChart() {
    // Récupérer les données depuis l'API
    const apiData = await fetchData();

    // Extraire les informations nécessaires pour le graphique
    const categories   = apiData.map(entry => entry.region ? entry.region.NomRegion : '');
    const seriesData = apiData.map(entry => entry.nbre);
    const seriesDataAjustee = normaliserValeurs(seriesData);
    // Configuration du graphique
  // Configuration du graphique
// Configuration du graphique
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


    // Initialisation du graphique
    const monGraphique = new Highcharts.Chart(configurationGraphique);
}

// Appeler la fonction pour créer le graphique
createChart();






// Highcharts.chart('container', {
//     chart: {
//         type: 'column'
//     },
//     title: {
//         align: 'left',
//         text: 'Browser market shares. January, 2022'
//     },
//     subtitle: {
//         align: 'left',
//         text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
//     },
//     accessibility: {
//         announceNewData: {
//             enabled: true
//         }
//     },
//     xAxis: {
//         type: 'category'
//     },
//     yAxis: {
//         title: {
//             text: 'Total percent market share'
//         }

//     },
//     legend: {
//         enabled: false
//     },
//     plotOptions: {
//         series: {
//             borderWidth: 0,
//             dataLabels: {
//                 enabled: true,
//                 format: '{point.y:.1f}%'
//             }
//         }
//     },

//     tooltip: {
//         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
//     },

//     series: [
//         {
//             name: 'Browsers',
//             colorByPoint: true,
//             data: [
//                 {
//                     name: 'Chrome',
//                     y: 63.06,
//                     drilldown: 'Chrome'
//                 },
//                 {
//                     name: 'Safari',
//                     y: 19.84,
//                     drilldown: 'Safari'
//                 },
//                 {
//                     name: 'Firefox',
//                     y: 4.18,
//                     drilldown: 'Firefox'
//                 },
//                 {
//                     name: 'Edge',
//                     y: 4.12,
//                     drilldown: 'Edge'
//                 },
//                 {
//                     name: 'Opera',
//                     y: 2.33,
//                     drilldown: 'Opera'
//                 },
//                 {
//                     name: 'Internet Explorer',
//                     y: 0.45,
//                     drilldown: 'Internet Explorer'
//                 },
//                 {
//                     name: 'Other',
//                     y: 1.582,
//                     drilldown: null
//                 }
//             ]
//         }
//     ],
//     drilldown: {
//         breadcrumbs: {
//             position: {
//                 align: 'right'
//             }
//         },
//         series: [
//             {
//                 name: 'Chrome',
//                 id: 'Chrome',
//                 data: [
//                     [
//                         'v65.0',
//                         0.1
//                     ],
//                     [
//                         'v64.0',
//                         1.3
//                     ],
//                     [
//                         'v63.0',
//                         53.02
//                     ],
//                     [
//                         'v62.0',
//                         1.4
//                     ],
//                     [
//                         'v61.0',
//                         0.88
//                     ],
//                     [
//                         'v60.0',
//                         0.56
//                     ],
//                     [
//                         'v59.0',
//                         0.45
//                     ],
//                     [
//                         'v58.0',
//                         0.49
//                     ],
//                     [
//                         'v57.0',
//                         0.32
//                     ],
//                     [
//                         'v56.0',
//                         0.29
//                     ],
//                     [
//                         'v55.0',
//                         0.79
//                     ],
//                     [
//                         'v54.0',
//                         0.18
//                     ],
//                     [
//                         'v51.0',
//                         0.13
//                     ],
//                     [
//                         'v49.0',
//                         2.16
//                     ],
//                     [
//                         'v48.0',
//                         0.13
//                     ],
//                     [
//                         'v47.0',
//                         0.11
//                     ],
//                     [
//                         'v43.0',
//                         0.17
//                     ],
//                     [
//                         'v29.0',
//                         0.26
//                     ]
//                 ]
//             },
//             {
//                 name: 'Firefox',
//                 id: 'Firefox',
//                 data: [
//                     [
//                         'v58.0',
//                         1.02
//                     ],
//                     [
//                         'v57.0',
//                         7.36
//                     ],
//                     [
//                         'v56.0',
//                         0.35
//                     ],
//                     [
//                         'v55.0',
//                         0.11
//                     ],
//                     [
//                         'v54.0',
//                         0.1
//                     ],
//                     [
//                         'v52.0',
//                         0.95
//                     ],
//                     [
//                         'v51.0',
//                         0.15
//                     ],
//                     [
//                         'v50.0',
//                         0.1
//                     ],
//                     [
//                         'v48.0',
//                         0.31
//                     ],
//                     [
//                         'v47.0',
//                         0.12
//                     ]
//                 ]
//             },
//             {
//                 name: 'Internet Explorer',
//                 id: 'Internet Explorer',
//                 data: [
//                     [
//                         'v11.0',
//                         6.2
//                     ],
//                     [
//                         'v10.0',
//                         0.29
//                     ],
//                     [
//                         'v9.0',
//                         0.27
//                     ],
//                     [
//                         'v8.0',
//                         0.47
//                     ]
//                 ]
//             },
//             {
//                 name: 'Safari',
//                 id: 'Safari',
//                 data: [
//                     [
//                         'v11.0',
//                         3.39
//                     ],
//                     [
//                         'v10.1',
//                         0.96
//                     ],
//                     [
//                         'v10.0',
//                         0.36
//                     ],
//                     [
//                         'v9.1',
//                         0.54
//                     ],
//                     [
//                         'v9.0',
//                         0.13
//                     ],
//                     [
//                         'v5.1',
//                         0.2
//                     ]
//                 ]
//             },
//             {
//                 name: 'Edge',
//                 id: 'Edge',
//                 data: [
//                     [
//                         'v16',
//                         2.6
//                     ],
//                     [
//                         'v15',
//                         0.92
//                     ],
//                     [
//                         'v14',
//                         0.4
//                     ],
//                     [
//                         'v13',
//                         0.1
//                     ]
//                 ]
//             },
//             {
//                 name: 'Opera',
//                 id: 'Opera',
//                 data: [
//                     [
//                         'v50.0',
//                         0.96
//                     ],
//                     [
//                         'v49.0',
//                         0.82
//                     ],
//                     [
//                         'v12.1',
//                         0.14
//                     ]
//                 ]
//             }
//         ]
//     }
// });

