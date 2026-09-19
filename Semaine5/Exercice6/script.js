// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 6 : Objet Math (racine carrée, arrondi et aléatoire)
// ==========================================================================

console.log("Exercice 6 chargé avec succès.");

/**
 * 1. Calcule la racine carrée d'un nombre saisi et son arrondi le plus proche.
 * Prévient les erreurs pour les nombres négatifs ou non numériques.
 */
function calculerRacine() {
  const input = document.getElementById("inputNombreMath");
  const resultat = document.getElementById("resultatRacine");
  const val = input.value.trim();

  // Validation champ vide
  if (val === "") {
    resultat.className = "result-box error";
    resultat.innerHTML = "⚠️ <strong>Erreur :</strong> Veuillez saisir un nombre.";
    return;
  }

  const nombre = Number(val);

  // Validation si non numérique
  if (isNaN(nombre)) {
    resultat.className = "result-box error";
    resultat.innerHTML = "⚠️ <strong>Erreur :</strong> La valeur saisie n'est pas un nombre valide.";
    return;
  }

  // Validation nombre négatif (la racine d'un nombre négatif n'existe pas dans les réels)
  if (nombre < 0) {
    resultat.className = "result-box error";
    resultat.innerHTML = `⚠️ <strong>Erreur mathématique :</strong> Impossible de calculer la racine carrée d'un nombre négatif (${nombre}).`;
    return;
  }

  // Calcul racine et arrondi
  const racine = Math.sqrt(nombre);
  const arrondi = Math.round(racine);

  resultat.className = "result-box success";
  resultat.innerHTML = `
    ✅ <strong>Calculs pour le nombre ${nombre} :</strong><br>
    • Racine carrée exacte (<code>Math.sqrt</code>) : <strong>${racine}</strong><br>
    • Valeur arrondie à 4 décimales : <strong>${racine.toFixed(4)}</strong><br>
    • Arrondi à l'entier le plus proche (<code>Math.round</code>) : <strong style="font-size: 1.15rem; color: #16a34a;">${arrondi}</strong>
  `;
}

/**
 * 2. Fonction Aleatoire() sans paramètre : retourne un entier entre 1 et 100
 */
function Aleatoire() {
  return Math.floor(Math.random() * 100) + 1;
}

function executerAleatoire() {
  const nombreTire = Aleatoire();
  const resultat = document.getElementById("resultatAleatoire1");
  console.log("Nombre aléatoire 1-100 tiré :", nombreTire);

  resultat.className = "result-box success";
  resultat.innerHTML = `
    🎲 Tirage aléatoire (1 à 100) : <strong style="font-size: 1.3rem; color: #2563eb;">${nombreTire}</strong>
  `;
}

/**
 * 3. Fonction Aleatoire2(min, max) : retourne un entier aléatoire entre min et max inclus
 */
function Aleatoire2(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function executerAleatoire2() {
  const minVal = Number(document.getElementById("inputMin").value);
  const maxVal = Number(document.getElementById("inputMax").value);
  const resultat = document.getElementById("resultatAleatoire2");

  if (isNaN(minVal) || isNaN(maxVal)) {
    resultat.className = "result-box error";
    resultat.innerHTML = "⚠️ <strong>Erreur :</strong> Veuillez renseigner des bornes numériques valides.";
    return;
  }

  if (minVal > maxVal) {
    resultat.className = "result-box error";
    resultat.innerHTML = "⚠️ <strong>Erreur :</strong> La valeur minimale ne peut pas être supérieure à la valeur maximale.";
    return;
  }

  const nombreTire = Aleatoire2(minVal, maxVal);
  console.log(`Nombre aléatoire [${minVal}, ${maxVal}] tiré :`, nombreTire);

  resultat.className = "result-box success";
  resultat.innerHTML = `
    🎲 Tirage dans [${minVal} ; ${maxVal}] : <strong style="font-size: 1.3rem; color: #2563eb;">${nombreTire}</strong>
  `;
}
