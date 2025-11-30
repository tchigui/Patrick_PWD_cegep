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
      genererGrille(params)
    })
    .catch(function (erreur) {
      console.error('Erreur lors du chargement des paramètres :', erreur)
    })
})

function genererGrille (params) {
  const conteneurTableau = document.getElementById('conteneurTableau')
  const infoSuperieur80 = document.getElementById('infoSuperieur80')

  const nbLignes = 20 // tu peux plus tard utiliser params.lignes, params.colonnes, etc.
  const nbColonnes = 15

  let compteurSuperieur80 = 0

  const table = document.createElement('table')
  const tbody = document.createElement('tbody')

  for (let ligne = 0; ligne < nbLignes; ligne++) {
    const tr = document.createElement('tr')

    for (let col = 0; col < nbColonnes; col++) {
      const valeur = Math.floor(Math.random() * (90 - 10 + 1)) + 10
      const td = creerCellule(valeur)

      if (valeur > 80) {
        compteurSuperieur80++
      }

      tr.appendChild(td)
    }

    tbody.appendChild(tr)
  }

  table.appendChild(tbody)
  conteneurTableau.innerHTML = ''
  conteneurTableau.appendChild(table)

  infoSuperieur80.textContent =
    'Nombre de cellules ayant un nombre supérieur à 80 : ' + compteurSuperieur80
}

function creerCellule (valeur) {
  const td = document.createElement('td')
  td.textContent = valeur

  if (valeur > 80) {
    td.style.backgroundColor = 'rgb(5, 173, 131)'
    td.style.color = 'rgb(255, 255, 255)'
  }

  return td
}
