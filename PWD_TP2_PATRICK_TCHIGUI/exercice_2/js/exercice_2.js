window.addEventListener('load', function () {
  chargerDefinitionForces()
  // On chargera les coefficients et on initialisera le formulaire après
})

function chargerDefinitionForces () {
  const URL_DEFINITION = 'http://localhost:8080/definition_forces.php'
  const divDefinition = document.getElementById('definitionForces')

  fetch(URL_DEFINITION)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Réponse HTTP invalide : ' + response.status)
      }
      return response.text()
    })
    .then(function (html) {
      divDefinition.innerHTML = html
    })
    .catch(function (erreur) {
      console.error('Erreur lors du chargement de la définition des forces :', erreur)
      divDefinition.textContent = 'Impossible de charger la définition des forces.'
      
    })
}
