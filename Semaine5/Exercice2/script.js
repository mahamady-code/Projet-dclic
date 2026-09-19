// ==========================================================================
// Formation D-CLIC - Activité 5 : JavaScript fondamentaux
// Exercice 2 : Boucles for, while et do...while
// ==========================================================================

console.log("Exercice 2 chargé avec succès.");

// --------------------------------------------------------------------------
// 1. AFFICHER LES NOMBRES DE 1 À 10 AVEC UNE BOUCLE FOR
// --------------------------------------------------------------------------
function afficherNombresFor() {
  const resultat = document.getElementById("resultatFor");
  const nombres = [];

  for (let i = 1; i <= 10; i++) {
    nombres.push(i);
  }

  console.log("Nombres de 1 à 10 :", nombres.join(", "));
  resultat.className = "result-box success";
  resultat.innerHTML = `<strong>Résultat de la boucle for (1 à 10) :</strong><br>
    <div style="margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
      ${nombres.map(n => `<span class="badge" style="background:#dbeafe; color:#1e40af; font-size:1rem; padding:6px 12px;">${n}</span>`).join("")}
    </div>`;
}

// --------------------------------------------------------------------------
// 2. CALCULER LA SOMME DES ENTIERS DE 1 À 100 AVEC UNE BOUCLE WHILE
// --------------------------------------------------------------------------
function calculerSommeWhile() {
  const resultat = document.getElementById("resultatWhile");
  let somme = 0;
  let i = 1;

  while (i <= 100) {
    somme += i;
    i++;
  }

  console.log("Somme de 1 à 100 avec while :", somme);
  resultat.className = "result-box success";
  resultat.innerHTML = `
    <strong>Calcul terminé :</strong><br>
    Formule : 1 + 2 + 3 + ... + 100<br>
    <strong>Somme totale = <span style="color:#16a34a; font-size:1.2rem;">${somme}</span></strong> (Vérification n(n+1)/2 = 100*101/2 = 5050).
  `;
}

// --------------------------------------------------------------------------
// 3. MINI-JEU DU NOMBRE SECRET AVEC DO...WHILE
// --------------------------------------------------------------------------

// Mode console / prompt() interactif avec boucle do...while stricte
function lancerJeuSecretPrompt() {
  const secret = Math.floor(Math.random() * 100) + 1;
  let proposition;
  let essais = 0;
  let abandon = false;

  alert("Bienvenue dans le jeu du Nombre Secret !\nUn nombre entre 1 et 100 a été choisi. À vous de deviner !");

  do {
    const saisie = prompt(`Tentative n°${essais + 1} :\nEntrez un nombre entre 1 et 100 (ou Annuler pour quitter) :`);
    
    if (saisie === null) {
      abandon = true;
      break;
    }

    const val = saisie.trim();
    if (val === "" || isNaN(Number(val))) {
      alert("⚠️ Erreur : Veuillez entrer un nombre valide !");
      continue;
    }

    proposition = parseInt(val, 10);
    essais++;

    if (proposition < 1 || proposition > 100) {
      alert("⚠️ Le nombre doit être compris entre 1 et 100.");
    } else if (proposition < secret) {
      alert(`📈 Trop petit ! C'est plus grand que ${proposition}.`);
    } else if (proposition > secret) {
      alert(`📉 Trop grand ! C'est plus petit que ${proposition}.`);
    }
  } while (proposition !== secret);

  const resultat = document.getElementById("resultatSecret");
  if (abandon) {
    alert("Partie interrompue.");
    resultat.className = "result-box error";
    resultat.textContent = `Partie abandonnée. Le nombre secret était ${secret}.`;
  } else {
    alert(`🎉 Félicitations ! Vous avez trouvé le nombre secret ${secret} en ${essais} tentative(s) !`);
    resultat.className = "result-box success";
    resultat.innerHTML = `🎉 <strong>Gagné !</strong> Le nombre secret était <strong>${secret}</strong> (trouvé en ${essais} essais).`;
  }
}

// Mode dans la page (version interface web)
let nombreSecretPage = Math.floor(Math.random() * 100) + 1;
let essaisPage = 0;

function initialiserJeuEnPage() {
  nombreSecretPage = Math.floor(Math.random() * 100) + 1;
  essaisPage = 0;
  document.getElementById("saisieDevinette").value = "";
  const res = document.getElementById("resultatSecret");
  res.className = "result-box info";
  res.textContent = "Nouveau nombre secret généré (entre 1 et 100). Faites votre première proposition !";
}

function verifierPropositionEnPage() {
  const input = document.getElementById("saisieDevinette");
  const resultat = document.getElementById("resultatSecret");
  const val = input.value.trim();

  if (val === "" || isNaN(Number(val))) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez saisir un nombre entier.";
    return;
  }

  const prop = parseInt(val, 10);
  essaisPage++;

  if (prop < 1 || prop > 100) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Le nombre doit être entre 1 et 100.";
  } else if (prop < nombreSecretPage) {
    resultat.className = "result-box warning";
    resultat.textContent = `📈 Trop petit ! Le nombre secret est plus grand que ${prop} (Essai #${essaisPage}).`;
  } else if (prop > nombreSecretPage) {
    resultat.className = "result-box warning";
    resultat.textContent = `📉 Trop grand ! Le nombre secret est plus petit que ${prop} (Essai #${essaisPage}).`;
  } else {
    resultat.className = "result-box success";
    resultat.innerHTML = `🎉 <strong>Bravo !</strong> Vous avez trouvé le nombre <strong>${nombreSecretPage}</strong> en <strong>${essaisPage}</strong> essai(s) !`;
  }
}

// --------------------------------------------------------------------------
// 4. SUITE DE FIBONACCI (N PREMIERS TERMES)
// --------------------------------------------------------------------------
function calculerFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const suite = [0, 1];
  for (let i = 2; i < n; i++) {
    suite.push(suite[i - 1] + suite[i - 2]);
  }
  return suite;
}

function genererFibonacci() {
  const input = document.getElementById("inputFibonacci");
  const resultat = document.getElementById("resultatFibonacci");
  const val = input.value.trim();

  if (val === "" || isNaN(Number(val))) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : Veuillez entrer un nombre entier positif.";
    return;
  }

  const n = parseInt(val, 10);
  if (n < 1) {
    resultat.className = "result-box error";
    resultat.textContent = "Erreur : N doit être supérieur ou égal à 1.";
    return;
  }
  if (n > 50) {
    resultat.className = "result-box error";
    resultat.textContent = "Attention : Pour des raisons de lisibilité, N est limité à 50.";
    return;
  }

  const suite = calculerFibonacci(n);
  resultat.className = "result-box success";
  resultat.innerHTML = `
    <strong>Les ${n} premiers termes de la suite de Fibonacci :</strong>
    <div class="pre-box">${suite.join(", ")}</div>
  `;
}

function testerFibonacciPrompt() {
  const saisie = prompt("Combien de termes de Fibonacci souhaitez-vous afficher ?");
  if (saisie === null || saisie.trim() === "") return;
  const n = parseInt(saisie.trim(), 10);
  if (isNaN(n) || n < 1) {
    alert("Erreur : Veuillez saisir un entier positif.");
  } else {
    const suite = calculerFibonacci(n);
    alert(`Les ${n} premiers termes de Fibonacci :\n${suite.join(", ")}`);
  }
}
