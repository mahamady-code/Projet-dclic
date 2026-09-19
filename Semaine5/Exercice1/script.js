// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 1 : Conditions (âge, pair/impair, mois)
// ==========================================================================

// Vérification de mise en place (Partie 0 de l'activité)
console.log("Formation D-CLIC – fonctions simples JavaScript");

// Tableau des mois de l'année (indice mois - 1)
const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// --------------------------------------------------------------------------
// 1. GESTION DE L'ÂGE
// --------------------------------------------------------------------------

// Version affichage dans la page (Bonus)
function verifierAge() {
  const input = document.getElementById("inputAge");
  const resultat = document.getElementById("resultatAge");
  const valeur = input.value.trim();

  if (valeur === "") {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez saisir un âge.";
    return;
  }

  const age = Number(valeur);

  if (isNaN(age)) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Ce n'est pas un nombre valide.";
  } else if (age < 0) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : L'âge ne peut pas être négatif.";
  } else if (age >= 18) {
    resultat.className = "result-box success";
    resultat.textContent = `Vous avez ${age} an(s) : Vous êtes majeur(e).`;
  } else {
    resultat.className = "result-box info";
    resultat.textContent = `Vous avez ${age} an(s) : Vous êtes mineur(e).`;
  }
}

// Version avec prompt() et alert()
function testerAgePrompt() {
  const saisieAge = prompt("Entrez votre âge :");
  if (saisieAge === null || saisieAge.trim() === "") {
    alert("Erreur : Vous n'avez rien saisi.");
    return;
  }
  const age = Number(saisieAge);
  if (isNaN(age)) {
    alert("Erreur : Ce n'est pas un nombre valide.");
  } else if (age < 0) {
    alert("Erreur : L'âge ne peut pas être négatif.");
  } else if (age >= 18) {
    alert("Vous êtes majeur(e).");
  } else {
    alert("Vous êtes mineur(e).");
  }
}

// --------------------------------------------------------------------------
// 2. GESTION PAIR / IMPAIR
// --------------------------------------------------------------------------

function verifierParite() {
  const input = document.getElementById("inputNombre");
  const resultat = document.getElementById("resultatParite");
  const valeur = input.value.trim();

  if (valeur === "") {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez saisir un nombre.";
    return;
  }

  const nombre = Number(valeur);

  if (isNaN(nombre)) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Saisie non numérique invalide.";
  } else {
    if (nombre % 2 === 0) {
      resultat.className = "result-box success";
      resultat.textContent = `Le nombre ${nombre} est PAIR.`;
    } else {
      resultat.className = "result-box info";
      resultat.textContent = `Le nombre ${nombre} est IMPAIR.`;
    }
  }
}

function testerParitePrompt() {
  const saisie = prompt("Entrez un nombre :");
  if (saisie === null || saisie.trim() === "") {
    alert("Erreur : Vous n'avez rien saisi.");
    return;
  }
  const n = Number(saisie);
  if (isNaN(n)) {
    alert("Erreur : Ce n'est pas un nombre valide.");
  } else if (n % 2 === 0) {
    alert(`Le nombre ${n} est PAIR.`);
  } else {
    alert(`Le nombre ${n} est IMPAIR.`);
  }
}

// --------------------------------------------------------------------------
// 3. GESTION DU MOIS (1 à 12)
// --------------------------------------------------------------------------

function verifierMois() {
  const input = document.getElementById("inputMois");
  const resultat = document.getElementById("resultatMois");
  const valeur = input.value.trim();

  if (valeur === "") {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez entrer un numéro de mois.";
    return;
  }

  const num = Number(valeur);

  if (isNaN(num) || !Number.isInteger(num)) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez entrer un nombre entier.";
  } else if (num < 1 || num > 12) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Le numéro de mois doit être compris entre 1 et 12.";
  } else {
    const nomMois = MOIS[num - 1];
    resultat.className = "result-box success";
    resultat.textContent = `Le mois n°${num} correspond à : ${nomMois}.`;
  }
}

function testerMoisPrompt() {
  const saisie = prompt("Entrez un numéro de mois (1 à 12) :");
  if (saisie === null || saisie.trim() === "") {
    alert("Erreur : Vous n'avez rien saisi.");
    return;
  }
  const num = Number(saisie);
  if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 12) {
    alert("Erreur : Veuillez entrer un entier valide entre 1 et 12.");
  } else {
    alert(`Le mois n°${num} est : ${MOIS[num - 1]}`);
  }
}
