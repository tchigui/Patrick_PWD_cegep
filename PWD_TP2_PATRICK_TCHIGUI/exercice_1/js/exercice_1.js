window.addEventListener('load', function () {
  const URL_PARAMS = 'http://localhost:8080/params_grille_nombres.php'
  const conteneurTableau = document.getElementById('conteneurTableau')

  fetch(URL_PARAMS)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Réponse HTTP invalide : ' + response.status)
      }
      return response.json()
    })
    .then(function (params) {
      console.log('Paramètres reçus pour la grille :', params)

      const nbLignes = 20
      const nbColonnes = 15

      const table = document.createElement('table')
      const tbody = document.createElement('tbody')

      for (let ligne = 0; ligne < nbLignes; ligne++) {
        const tr = document.createElement('tr')

        for (let col = 0; col < nbColonnes; col++) {
          const td = document.createElement('td')
          td.textContent = '0' // valeur provisoire
          tr.appendChild(td)
        }

        tbody.appendChild(tr)
      }

      table.appendChild(tbody)
      conteneurTableau.innerHTML = ''
      conteneurTableau.appendChild(table)
    })
    .catch(function (erreur) {
      console.error('Erreur lors du chargement des paramètres :', erreur)
    })
})
