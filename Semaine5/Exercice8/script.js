// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 8 : Mini-projet - Calculateur de prêt
// ==========================================================================

console.log("Exercice 8 chargé avec succès.");

/**
 * Calcule le paiement mensuel, le coût total et les intérêts d'un emprunt.
 */
function calculerPret() {
  const champMontant = document.getElementById("montantPret");
  const champTaux = document.getElementById("tauxAnnuel");
  const champDuree = document.getElementById("dureeAnnees");
  const zoneResultat = document.getElementById("resultatPret");
  const blocRecap = document.getElementById("blocRecapitulatif");

  const valMontant = champMontant.value.trim();
  const valTaux = champTaux.value.trim();
  const valDuree = champDuree.value.trim();

  // 1. Validation : Présence des champs
  if (valMontant === "" || valTaux === "" || valDuree === "") {
    zoneResultat.className = "result-box error";
    zoneResultat.innerHTML = "⚠️ <strong>Erreur :</strong> Veuillez renseigner tous les champs obligatoires.";
    blocRecap.style.display = "none";
    return;
  }

  const montant = Number(valMontant);
  const tauxAnnuel = Number(valTaux);
  const dureeAnnees = Number(valDuree);

  // 2. Validation : Type numérique
  if (isNaN(montant) || isNaN(tauxAnnuel) || isNaN(dureeAnnees)) {
    zoneResultat.className = "result-box error";
    zoneResultat.innerHTML = "⚠️ <strong>Erreur :</strong> Toutes les valeurs doivent être des nombres valides.";
    blocRecap.style.display = "none";
    return;
  }

  // 3. Validation des contraintes de gestion (montant > 0, durée > 0, taux >= 0)
  if (montant <= 0) {
    zoneResultat.className = "result-box error";
    zoneResultat.innerHTML = "⚠️ <strong>Erreur :</strong> Le montant du prêt doit être strictement supérieur à 0.";
    blocRecap.style.display = "none";
    return;
  }

  if (dureeAnnees <= 0) {
    zoneResultat.className = "result-box error";
    zoneResultat.innerHTML = "⚠️ <strong>Erreur :</strong> La durée de remboursement doit être supérieure à 0 an.";
    blocRecap.style.display = "none";
    return;
  }

  if (tauxAnnuel < 0) {
    zoneResultat.className = "result-box error";
    zoneResultat.innerHTML = "⚠️ <strong>Erreur :</strong> Le taux d'intérêt ne peut pas être négatif.";
    blocRecap.style.display = "none";
    return;
  }

  // 4. Calcul mathématique de l'échéance
  // Nombre total de mensualités n = années * 12
  const n = dureeAnnees * 12;

  let mensualite = 0;
  let coutTotal = 0;
  let totalInterets = 0;

  // Cas d'un taux d'intérêt nul (0%)
  if (tauxAnnuel === 0) {
    mensualite = montant / n;
    coutTotal = montant;
    totalInterets = 0;
  } else {
    // Taux d'intérêt mensuel proportionnel r = tauxAnnuel / 12 / 100
    const r = tauxAnnuel / 12 / 100;
    // Formule : M = P * [r * (1 + r)^n] / [(1 + r)^n - 1]
    const facteur = Math.pow(1 + r, n);
    mensualite = montant * (r * facteur) / (facteur - 1);
  }

  // 5. Affichage avec 2 décimales fixes et calcul cohérent du total
  const mensualiteFormat = mensualite.toFixed(2);
  const mensualiteArrondie = parseFloat(mensualiteFormat);
  coutTotal = mensualiteArrondie * n;
  totalInterets = coutTotal - montant;

  const coutTotalFormat = coutTotal.toFixed(2);
  const interetsFormat = totalInterets.toFixed(2);

  console.log("Résultats de la simulation :", {
    montant,
    tauxAnnuel,
    dureeAnnees,
    mensualite: mensualiteFormat,
    coutTotal: coutTotalFormat,
    interets: interetsFormat
  });

  zoneResultat.className = "result-box success";
  zoneResultat.innerHTML = `
    ✅ <strong>Simulation calculée avec succès :</strong><br>
    Pour un capital emprunté de <strong>${montant.toLocaleString("fr-FR")}</strong> à <strong>${tauxAnnuel}%</strong> sur <strong>${dureeAnnees} an(s)</strong> (${n} mensualités) :<br>
    • Votre paiement mensuel est de : <strong style="font-size:1.25rem; color:#2563eb;">${mensualiteFormat}</strong>
  `;

  // Mise à jour et affichage du bloc récapitulatif détaillé (Bonus)
  document.getElementById("recapMensualite").textContent = `${mensualiteFormat}`;
  document.getElementById("recapInterets").textContent = `${interetsFormat}`;
  document.getElementById("recapTotal").textContent = `${coutTotalFormat}`;
  blocRecap.style.display = "block";
}

/**
 * Réinitialise le formulaire de prêt et masque les résultats.
 */
function reinitialiserPret() {
  document.getElementById("formPret").reset();
  const zoneResultat = document.getElementById("resultatPret");
  zoneResultat.className = "result-box info";
  zoneResultat.textContent = "Veuillez remplir les informations du prêt puis cliquer sur \"Calculer\".";
  document.getElementById("blocRecapitulatif").style.display = "none";
  document.getElementById("montantPret").focus();
}
