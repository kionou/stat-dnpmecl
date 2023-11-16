
        console.log('bonjour le monde des vivants');

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

                // Utilisation de fetch avec l'URL complète
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

            // Mettre à jour le texte de la page actuelle
            // document.getElementById('currentPage').textContent = `Page ${currentPage}`;


        // Mettre à jour le numéro de la page actuelle et le nombre total de pages
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
   
