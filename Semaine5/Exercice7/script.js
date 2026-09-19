// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 7 : Objet Date (parsing, écart de dates et horloge temps réel)
// ==========================================================================

console.log("Exercice 7 chargé avec succès.");

// --------------------------------------------------------------------------
// 1. PARSING ET CALCUL D'ÉCART EN JOURS (exercise3.html)
// --------------------------------------------------------------------------

/**
 * Analyse une date saisie sous format JJ-MM-AAAA,
 * vérifie sa validité, affiche jour/mois/année et l'écart avec aujourd'hui.
 */
function analyserDateSaisie() {
  const input = document.getElementById("inputDateTexte");
  const resultat = document.getElementById("resultatDate");

  if (!input || !resultat) return;

  const texte = input.value.trim();

  // 1. Vérification du format JJ-MM-AAAA
  const regexFormat = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/;
  const match = texte.match(regexFormat);

  if (!match) {
    resultat.className = "result-box error";
    resultat.innerHTML = "⚠️ <strong>Erreur de format :</strong> Veuillez saisir la date au format <code>JJ-MM-AAAA</code> (ex: 25-12-2026).";
    return;
  }

  const jour = parseInt(match[1], 10);
  const mois = parseInt(match[2], 10);
  const annee = parseInt(match[3], 10);

  // 2. Vérification des bornes de base
  if (mois < 1 || mois > 12) {
    resultat.className = "result-box error";
    resultat.innerHTML = `⚠️ <strong>Erreur :</strong> Le mois (${mois}) doit être compris entre 1 et 12.`;
    return;
  }

  // 3. Construction de l'objet Date (les mois commencent à 0 en JavaScript)
  const dateObjet = new Date(annee, mois - 1, jour);

  // Vérification de cohérence (ex: 31 février se transforme automatiquement en mars par overflow)
  if (
    dateObjet.getFullYear() !== annee ||
    dateObjet.getMonth() !== mois - 1 ||
    dateObjet.getDate() !== jour
  ) {
    resultat.className = "result-box error";
    resultat.innerHTML = `⚠️ <strong>Date invalide :</strong> Le jour ${jour} n'existe pas dans le mois ${mois}/${annee}.`;
    return;
  }

  // 4. Calcul de l'écart avec la date du jour (en ignorant les heures pour un décompte en jours entiers)
  const aujourdhui = new Date();
  const dateAujourdhuiMinuit = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate());
  const dateSaisieMinuit = new Date(annee, mois - 1, jour);

  const diffMillisecondes = dateSaisieMinuit.getTime() - dateAujourdhuiMinuit.getTime();
  const millisecondesParJour = 1000 * 60 * 60 * 24;
  const ecartJours = Math.round(diffMillisecondes / millisecondesParJour);

  // Message temporel adapté
  let messageEcart = "";
  if (ecartJours === 0) {
    messageEcart = "C'est <strong>aujourd'hui même</strong> !";
  } else if (ecartJours > 0) {
    messageEcart = `Cette date se situe dans <strong>${ecartJours} jour(s)</strong> dans le futur.`;
  } else {
    messageEcart = `Cette date est passée il y a <strong>${Math.abs(ecartJours)} jour(s)</strong>.`;
  }

  // Affichage sous forme jour/mois/année et résultat
  const jourFormate = String(jour).padStart(2, "0");
  const moisFormate = String(mois).padStart(2, "0");

  resultat.className = "result-box success";
  resultat.innerHTML = `
    ✅ <strong>Date analysée avec succès :</strong><br>
    • Format jour / mois / année : <strong>${jourFormate} / ${moisFormate} / ${annee}</strong><br>
    • Jour de la semaine : <strong>${dateObjet.toLocaleDateString("fr-FR", { weekday: "long" })}</strong><br>
    • Écart avec aujourd'hui : ${messageEcart} (écart absolu : ${Math.abs(ecartJours)} jours).
  `;
}

// --------------------------------------------------------------------------
// 2. HORLOGE EN TEMPS RÉEL (temps_reel.html)
// --------------------------------------------------------------------------

function actualiserHorloge() {
  const elemHorloge = document.getElementById("horlogeNumerique");
  const elemDate = document.getElementById("dateDuJour");

  if (!elemHorloge) return; // Si nous sommes sur exercise3.html, ne rien faire

  const maintenant = new Date();

  // Extraction et formatage avec padStart(2, "0")
  const heures = String(maintenant.getHours()).padStart(2, "0");
  const minutes = String(maintenant.getMinutes()).padStart(2, "0");
  const secondes = String(maintenant.getSeconds()).padStart(2, "0");

  elemHorloge.textContent = `${heures}:${minutes}:${secondes}`;

  // Bonus : Date complète en français
  if (elemDate) {
    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const dateFr = maintenant.toLocaleDateString("fr-FR", optionsDate);
    // Mettre la première lettre en majuscule
    elemDate.textContent = dateFr.charAt(0).toUpperCase() + dateFr.slice(1);
  }
}

// Lancement automatique si l'élément de l'horloge est présent
if (document.getElementById("horlogeNumerique")) {
  actualiserHorloge();
  setInterval(actualiserHorloge, 1000);
}
