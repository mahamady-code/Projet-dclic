// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 4 : Interaction utilisateur (inputs, événements et affichage)
// ==========================================================================

console.log("Exercice 4 chargé avec succès.");

/**
 * Récupère les deux valeurs saisies dans le formulaire,
 * valide les entrées et affiche la somme ou un message d'erreur.
 */
function additionner() {
  const zoneResultat = document.getElementById("zoneResultat");

  // Récupération via l'objet document.forms comme spécifié dans la consigne
  const saisie1 = document.forms["monFormulaire"].elements["nomDuChamp1"].value.trim();
  const saisie2 = document.forms["monFormulaire"].elements["nomDuChamp2"].value.trim();

  // 1. Validation de champ vide
  if (saisie1 === "" || saisie2 === "") {
    zoneResultat.className = "result-box error";
    zoneResultat.innerHTML = `⚠️ <strong>Erreur :</strong> Veuillez remplir les deux champs de saisie.`;
    return;
  }

  // 2. Conversion en nombre
  const val1 = Number(saisie1);
  const val2 = Number(saisie2);

  // 3. Validation de type numérique
  if (isNaN(val1) || isNaN(val2)) {
    zoneResultat.className = "result-box error";
    let message = "⚠️ <strong>Erreur :</strong> ";
    if (isNaN(val1) && isNaN(val2)) {
      message += "Les deux valeurs saisies ne sont pas numériques.";
    } else if (isNaN(val1)) {
      message += `La première valeur ("${saisie1}") n'est pas un nombre valide.`;
    } else {
      message += `La deuxième valeur ("${saisie2}") n'est pas un nombre valide.`;
    }
    zoneResultat.innerHTML = message;
    return;
  }

  // 4. Calcul de l'addition
  const somme = val1 + val2;

  // 5. Affichage du résultat avec mise en forme
  zoneResultat.className = "result-box success";
  zoneResultat.innerHTML = `
    ✅ <strong>Calcul réussi :</strong><br>
    ${val1} + ${val2} = <strong style="font-size: 1.25rem; color: #16a34a;">${somme}</strong>
  `;
}

/**
 * Réinitialise les deux champs de saisie et la zone de résultat.
 */
function reinitialiser() {
  // Réinitialisation des champs du formulaire
  document.forms["monFormulaire"].elements["nomDuChamp1"].value = "";
  document.forms["monFormulaire"].elements["nomDuChamp2"].value = "";

  // Réinitialisation de la zone de résultat
  const zoneResultat = document.getElementById("zoneResultat");
  zoneResultat.className = "result-box info";
  zoneResultat.textContent = "Champs réinitialisés. Saisissez deux nouvelles valeurs.";

  // Remettre le focus sur le premier champ
  document.forms["monFormulaire"].elements["nomDuChamp1"].focus();
}
