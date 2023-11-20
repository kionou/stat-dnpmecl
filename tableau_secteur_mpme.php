<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="table.css">
    <title>Mpme par secteur d'activite</title>
    <style>
       *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@import url(https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,500,500i,600,600i,700,700i,800|Open+Sans:400,400i,600,600i,700,700i,800&display=swap);
:root {
  --font-default: "Open Sans",   sans-serif;
  --font-primary: "Montserrat", sans-serif;
  --font-secondary: "Poppins", sans-serif;
}

/* Colors */
:root {
  --color-default: #222222;
  --color-primary: #139864;
  --color-secondary: #F9D310;
}


h1 {
  font-family: var(--font-primary);
}

h1{
    font-weight: 800;
    text-transform: uppercase;
    font-size: 28px;
    line-height: normal;
    color: var(--color-primary);
}


body {
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
    font-family: var(--font-defaut);
    color: var(--color-default);
  
}
.header{
display: flex;
align-items: center;
justify-content: center;
padding: 15px 0;
height: 100vh;
}

.header1{
width: 95%;
box-shadow: 0 1px 3px #0000001a, 0 1px 2px #0000000f;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 10px;
}

.table {
    border-spacing: 0px !important;
    border-collapse: collapse;
    font-size: 25px;
    text-transform:capitalize;
}

@media (max-width: 767px) {
.table-responsive {
    width: 100%;
    margin-bottom: 15px;
    overflow-y: hidden;
    overflow-x: scroll;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: 1px solid #ddd;
    -webkit-overflow-scrolling: touch;
}
}
    </style>
</head>
<body>
    <div class="header">
        <div class="header1">
            <h1 class="text-center">MPME PAR SECTEUR ACTIVITE  <span id="pageInfo" class="text-center"></span>  </h1> 
            
            <table width="95%" border="0">
                <tbody>
                    <tr>
                  <td>
                <table align="center" class="table table-striped table-bordered table-hover table-responsive dataTable v_align" id="tab_dec_an">
                  <thead>
                    <tr>
                      <th>Secteur activite</th>
                      <th class="center">Nombre</th>
                      </tr>
                   
                  </thead>
                  <tbody>
                          <!-- <tr>
                      <td><strong> </strong></td> 
                      <td class="center" nowrap="nowrap" align="right">2 256</td>
                      
                      </tr> -->
                             <tr>
                      <td><strong> </strong></td> 
                      <td class="center" nowrap="nowrap" align="right"></td>
                      
                      </tr>
                          
                        </tbody>
                    </table></td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script>
        const apiUrl = "https://mpme-guinee.com/bd/public/api/secteurs-activites";
        let currentPage = 1;
        const itemsPerPage = 10; // Nombre d'éléments à afficher par page
        let apiData = [];

        // Fonction pour récupérer les données depuis l'API
        async function fetchData() {
            try {
                // Construction de l'URL avec les paramètres
                const apiUrlWithParams = new URL(apiUrl);
                apiUrlWithParams.searchParams.append('with_relation', true);
                const response = await fetch(apiUrlWithParams);
                const data = await response.json();
                console.log('response', data.data.data);
                return data.data.data; // Retourne uniquement la partie 'data' de la réponse
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        }
// Fonction pour créer et afficher le tableau avec les données de l'API
async function createTable() {
    // Récupérer les données depuis l'API
    apiData = await fetchData();

    // Sélectionner le corps du tableau
    const tbody = document.querySelector('#tab_dec_an tbody');
    // Effacer le contenu existant du tableau
    tbody.innerHTML = '';
    // Calculer les indices de début et de fin pour la pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Parcourir les données de l'API et ajouter des lignes au tableau
    for (let i = startIndex; i < endIndex && i < apiData.length; i++) {
        const entry = apiData[i];
        // Créer une nouvelle ligne de tableau
        const row = document.createElement('tr');
        // Créer la cellule pour le secteur d'activité
        const secteurCell = document.createElement('td');
        secteurCell.textContent = entry.PrincipalSecteurActivite && (entry.secteur_activite ? entry.secteur_activite.NomSecteurActivite : '');
        row.appendChild(secteurCell);

        // Créer la cellule pour le nombre
        const nombreCell = document.createElement('td');
        nombreCell.textContent = entry.nbre.toLocaleString(); // Formatage pour ajouter les séparateurs de milliers
        nombreCell.classList.add('center');
        row.appendChild(nombreCell);

        // Ajouter la ligne au corps du tableau
        tbody.appendChild(row);
    }
// Mettre à jour le numéro de la page actuelle et le nombre total de pages
const totalPages = Math.ceil(apiData.length / itemsPerPage);
const pageInfoElement = document.getElementById('pageInfo');

// Vérifier si l'élément avec l'id "pageInfo" existe avant de le mettre à jour
if (pageInfoElement) {
pageInfoElement.textContent = `(${currentPage}/${totalPages})`;
} else {
console.error('L\'élément avec l\'id "pageInfo" n\'a pas été trouvé.');
}

}

// Fonction pour changer de page
async function changePage(delta) {
    currentPage += delta;

    // Vérifier les limites de la pagination
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > Math.ceil(apiData.length / itemsPerPage)) {
        currentPage = Math.ceil(apiData.length / itemsPerPage);
    }

    // Mettre à jour le contenu du tableau avec les données de la nouvelle page
    await createTable();
}

// Appeler la fonction pour créer et afficher le tableau
createTable();

setInterval(async () => {
    await changePage(1);
}, 5000);

    </script>
</body>
</html>