

window.addEventListener('load', function () {
  const URL_PARAMS = 'http://localhost:8080/params_grille_nombres.php'

  fetch(URL_PARAMS)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Réponse HTTP invalide : ' + response.status)
      }
      return response.json()
    })
    .then(function (params) {
      console.log('Paramètres reçus pour la grille :', params)
      // On utilisera params plus tard si nécessaire
    })
    .catch(function (erreur) {
      console.error('Erreur lors du chargement des paramètres :', erreur)
    })
})
