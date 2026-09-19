// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 3 : Logique et Algorithmes (niveau 1)
// ==========================================================================

console.log("Exercice 3 chargé avec succès.");

// --------------------------------------------------------------------------
// 1. NOMBRES PREMIERS ENTRE 1 ET 100
// --------------------------------------------------------------------------
function estPremier(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function afficherNombresPremiers() {
  const resultat = document.getElementById("resultatPremiers");
  const premiers = [];

  for (let i = 1; i <= 100; i++) {
    if (estPremier(i)) {
      premiers.push(i);
    }
  }

  console.log("Nombres premiers entre 1 et 100 :", premiers);
  resultat.className = "result-box success";
  resultat.innerHTML = `
    <strong>${premiers.length} nombres premiers trouvés entre 1 et 100 :</strong>
    <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px;">
      ${premiers.map(p => `<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:bold;">${p}</span>`).join("")}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 2. FACTEURS / DIVISEURS D'UN NOMBRE SAISI
// --------------------------------------------------------------------------
function trouverFacteurs() {
  const input = document.getElementById("inputFacteurs");
  const resultat = document.getElementById("resultatFacteurs");
  const val = input.value.trim();

  if (val === "" || isNaN(Number(val))) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez entrer un nombre entier valide.";
    return;
  }

  const n = parseInt(val, 10);
  if (n <= 0) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez entrer un nombre entier strictement positif (supérieur à 0).";
    return;
  }

  const facteurs = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      facteurs.push(i);
    }
  }

  console.log(`Facteurs de ${n} :`, facteurs);
  resultat.className = "result-box success";
  resultat.innerHTML = `
    <strong>Facteurs (diviseurs) de ${n} :</strong><br>
    Liste : <code>[ ${facteurs.join(", ")} ]</code><br>
    Nombre total de diviseurs : <strong>${facteurs.length}</strong>
    ${facteurs.length === 2 ? "<em>(Ce nombre est donc premier)</em>" : ""}
  `;
}

// --------------------------------------------------------------------------
// 3. MOYENNE DES NOMBRES POSITIFS SAISIS JUSQU'À UN NÉGATIF
// --------------------------------------------------------------------------

// Mode avec prompt()
function lancerSaisieMoyennePrompt() {
  let somme = 0;
  let compteur = 0;
  const saisies = [];

  alert("Saisie des nombres positifs pour calcul de moyenne.\nEntrez un nombre négatif pour arrêter.");

  while (true) {
    const input = prompt(`Nombre n°${compteur + 1} (nombre négatif pour arrêter) :`);
    if (input === null) {
      alert("Saisie annulée.");
      return;
    }

    const val = input.trim();
    if (val === "" || isNaN(Number(val))) {
      alert("⚠️ Valeur invalide, veuillez recommencer.");
      continue;
    }

    const nombre = parseFloat(val);
    if (nombre < 0) {
      break; // Arrêt dès qu'un nombre négatif est entré
    }

    somme += nombre;
    compteur++;
    saisies.push(nombre);
  }

  const resultat = document.getElementById("resultatMoyenne");
  if (compteur === 0) {
    alert("Aucun nombre positif n'a été saisi.");
    resultat.className = "result-box warning";
    resultat.textContent = "Aucun nombre positif saisi avant l'arrêt.";
  } else {
    const moyenne = (somme / compteur).toFixed(2);
    alert(`Fin de saisie !\nNombres saisis : ${saisies.join(", ")}\nSomme : ${somme}\nNombre d'éléments : ${compteur}\nMoyenne : ${moyenne}`);
    resultat.className = "result-box success";
    resultat.innerHTML = `
      <strong>Résultat du calcul de moyenne (Prompt) :</strong><br>
      Valeurs saisies : <code>${saisies.join(", ")}</code><br>
      Nombre de valeurs positives : <strong>${compteur}</strong><br>
      Somme cumulée : <strong>${somme}</strong><br>
      <strong>Moyenne : <span style="font-size:1.15rem; color:#16a34a;">${moyenne}</span></strong>
    `;
  }
}

// Mode page
let pageSomme = 0;
let pageCompteur = 0;
let pageNombres = [];
let pageTermine = false;

function reinitialiserMoyennePage() {
  pageSomme = 0;
  pageCompteur = 0;
  pageNombres = [];
  pageTermine = false;
  document.getElementById("inputMoyenne").value = "";
  document.getElementById("inputMoyenne").disabled = false;
  const res = document.getElementById("resultatMoyenne");
  res.className = "result-box info";
  res.textContent = "En attente de saisie...";
}

function ajouterNombreMoyennePage() {
  const input = document.getElementById("inputMoyenne");
  const resultat = document.getElementById("resultatMoyenne");

  if (pageTermine) {
    resultat.className = "result-box warning";
    resultat.textContent = "La série est terminée. Cliquez sur 'Réinitialiser' pour recommencer.";
    return;
  }

  const val = input.value.trim();
  if (val === "" || isNaN(Number(val))) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez saisir un nombre valide.";
    return;
  }

  const nombre = parseFloat(val);
  input.value = "";
  input.focus();

  if (nombre < 0) {
    pageTermine = true;
    input.disabled = true;
    if (pageCompteur === 0) {
      resultat.className = "result-box warning";
      resultat.textContent = `Nombre négatif (${nombre}) saisi immédiatement. Aucun nombre positif enregistré.`;
    } else {
      const moyenne = (pageSomme / pageCompteur).toFixed(2);
      resultat.className = "result-box success";
      resultat.innerHTML = `
        🛑 <strong>Arrêt (nombre négatif : ${nombre}) :</strong><br>
        Valeurs positives retenues : <code>${pageNombres.join(", ")}</code><br>
        Somme : <strong>${pageSomme}</strong> | Effectif : <strong>${pageCompteur}</strong><br>
        <strong>Moyenne = <span style="font-size:1.2rem; color:#16a34a;">${moyenne}</span></strong>
      `;
    }
  } else {
    pageSomme += nombre;
    pageCompteur++;
    pageNombres.push(nombre);
    resultat.className = "result-box info";
    resultat.innerHTML = `
      Valeur <strong>${nombre}</strong> ajoutée avec succès.<br>
      Total provisoire : ${pageCompteur} nombre(s) saisi(s) (Somme actuelle : ${pageSomme}).
    `;
  }
}

// --------------------------------------------------------------------------
// 4. MOTIF TRIANGULAIRE D'ÉTOILES (BOUCLES IMBRIQUÉES)
// --------------------------------------------------------------------------
function genererTriangleEtoiles() {
  const input = document.getElementById("inputHauteurTriangle");
  const resultat = document.getElementById("resultatTriangle");
  const val = input.value.trim();

  if (val === "" || isNaN(Number(val))) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez renseigner une hauteur valide.";
    return;
  }

  const hauteur = parseInt(val, 10);
  if (hauteur < 1 || hauteur > 30) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : La hauteur doit être comprise entre 1 et 30.";
    return;
  }

  let motif = "";
  // Boucle externe pour chaque ligne de 1 à hauteur
  for (let i = 1; i <= hauteur; i++) {
    let ligne = "";
    // Boucle interne pour ajouter les étoiles de la ligne
    for (let j = 1; j <= i; j++) {
      ligne += "*";
    }
    motif += ligne + "\n";
  }

  console.log("Triangle généré :\n" + motif);
  resultat.className = "result-box success";
  resultat.innerHTML = `
    <strong>Triangle d'étoiles (Hauteur = ${hauteur}) :</strong>
    <div class="pre-box">${motif}</div>
  `;
}
