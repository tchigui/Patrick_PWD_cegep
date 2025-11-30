const coefficients = {}

window.addEventListener('load', function () {
  chargerDefinitionForces()
  chargerCoefficients()
  initialiserFormulaire()
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

function chargerCoefficients () {
  const URL_COEFFS = 'http://localhost:8080/data_cdp_k.php'

  fetch(URL_COEFFS)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Réponse HTTP invalide : ' + response.status)
      }
      return response.json()
    })
    .then(function (donnees) {
      console.log('Coefficients CDp/K reçus :', donnees)
      // on copie les propriétés dans l'objet existant (coefficients est const)
      Object.assign(coefficients, donnees)
    })
    .catch(function (erreur) {
      console.error('Erreur lors du chargement des coefficients CDp/K :', erreur)
    })
}

function initialiserFormulaire () {
  const form = document.getElementById('formCD')
  const selectFlap = document.getElementById('inputFlap')
  const inputMach = document.getElementById('inputMach')
  const inputCl = document.getElementById('inputCl')
  const zoneMessage = document.getElementById('zoneMessage')

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const flap = parseInt(selectFlap.value)
    const M = parseFloat(inputMach.value)
    const Cl = parseFloat(inputCl.value)

    zoneMessage.innerHTML = ''

    const messageErreur = validerSaisie(flap, M, Cl)
    if (messageErreur) {
      afficherMessage(zoneMessage, messageErreur, 'danger')
      return
    }

    const resultatCD = calculerCD(flap, M, Cl)
    const texte = 'CD = ' + resultatCD.toFixed(4)

    afficherMessage(zoneMessage, texte, 'success')
  })
}

function validerSaisie (flap, M, Cl) {
  if (![0, 20, 45].includes(flap)) {
    return 'La valeur de Flap doit être 0, 20 ou 45.'
  }

  if (isNaN(M) || M < 0 || M > 0.85) {
    return 'Le nombre de Mach (M) doit être entre 0 et 0,85.'
  }

  if (isNaN(Cl) || Cl < 0.2 || Cl > 1.2) {
    return 'Le coefficient de portance (Cl) doit être entre 0,2 et 1,2.'
  }

  return ''
}

function calculerCD (flap, M, Cl) {
  const infosFlap = coefficients[flap]

  if (!infosFlap) {
    throw new Error('Aucun coefficient trouvé pour Flap = ' + flap)
  }

  const CDp = parseFloat(infosFlap.CDp)
  const K = parseFloat(infosFlap.K)
  const Cl2 = Cl * Cl

  let CDcomp = 0

  if (M >= 0 && M <= 0.60) {
    CDcomp = 0
  } else if (M > 0.60 && M <= 0.78) {
    CDcomp = (0.0508 - 0.1748 * M + 0.1504 * M * M) * Cl2
  } else if (M > 0.78 && M <= 0.85) {
    CDcomp = (-99.3434 + 380.888 * M - 486.8 * M * M + 207.408 * M * M * M) * Cl2
  }

  const CD = CDp + K * Cl2 + CDcomp
  return CD
}

function afficherMessage (zone, texte, type) {
  zone.innerHTML =
    '<div class="alert alert-' + type + '" role="alert">' +
      texte +
    '</div>'
}
