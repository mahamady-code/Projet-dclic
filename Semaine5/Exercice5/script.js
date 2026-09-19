// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 5 : Objet String (longueur, sous-chaîne et affichage en direct)
// ==========================================================================

console.log("Exercice 5 chargé avec succès.");

// Récupération des éléments du DOM
const champTexte = document.getElementById("champTexte");
const statLongueur = document.getElementById("statLongueur");
const statMots = document.getElementById("statMots");
const statSousChaine = document.getElementById("statSousChaine");
const statMajuscules = document.getElementById("statMajuscules");

/**
 * Fonction exécutée à chaque événement "input" sur le champ de saisie.
 */
function analyserTexte() {
  const texte = champTexte.value;

  // 1. Longueur de la chaîne
  const longueur = texte.length;
  statLongueur.textContent = longueur;

  // 2. Extraction des 3 premiers caractères avec slice(0, 3)
  if (longueur === 0) {
    statSousChaine.textContent = "(aucun)";
  } else {
    const extrait = texte.slice(0, 3);
    statSousChaine.textContent = `"${extrait}"`;
  }

  // 3. Bonus : Texte converti en majuscules
  statMajuscules.textContent = texte.toUpperCase() || "(vide)";

  // 4. Bonus : Comptage du nombre de mots avec trim() et regex pour séparer sur les espaces multiples
  const texteNettoye = texte.trim();
  let nombreMots = 0;
  if (texteNettoye.length > 0) {
    // Séparation par les espaces, tabulations ou sauts de ligne
    const listeMots = texteNettoye.split(/\s+/);
    nombreMots = listeMots.length;
  }
  statMots.textContent = nombreMots;
}

// Écouteur d'événement sur la saisie en direct
champTexte.addEventListener("input", analyserTexte);
