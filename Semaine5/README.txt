================================================================================
FORMATION D-CLIC - DÉVELOPPEMENT WEB
ACTIVITÉ N°5 : JAVASCRIPT FONDAMENTAUX ET INTERACTIONS UTILISATEUR
================================================================================

Apprenant : KABORE Mahamady
Date : Septembre 2026
Projet : Activité 5 - JavaScript (Semaine 5)
Navigateur recommandé / testé : Google Chrome / Microsoft Edge (Moteur Chromium)

--------------------------------------------------------------------------------
1. ORGANISATION DES DOSSIERS ET FICHIERS
--------------------------------------------------------------------------------
L'arborescence respecte rigoureusement la structure demandée dans les consignes :

Activite5_JS_KABORE_Mahamady/
├── Exercice1/
│   ├── index.html        (Conditions : Âge mineur/majeur, parité pair/impair, mois de l'année)
│   └── script.js
├── Exercice2/
│   ├── boucles.html      (Boucles for, while, mini-jeu do...while du nombre secret, Fibonacci)
│   └── script.js
├── Exercice3/
│   ├── algos.html        (Nombres premiers 1 à 100, facteurs d'un nombre, moyenne, motif étoiles)
│   └── script.js
├── Exercice4/
│   ├── dom_basics.html   (Calculatrice formulaire DOM, gestion onclick, validation des entrées)
│   └── script.js
├── Exercice5/
│   ├── exercise1.html    (Objet String : événement input direct, longueur, sous-chaîne, mots)
│   └── script.js
├── Exercice6/
│   ├── exercise2.html    (Objet Math : racine carrée, arrondi, Aleatoire(), Aleatoire2(min, max))
│   └── script.js
├── Exercice7/
│   ├── exercise3.html    (Objet Date : parsing JJ-MM-AAAA et calcul d'écart en jours)
│   ├── temps_reel.html   (Horloge numérique dynamique avec setInterval et padStart)
│   └── script.js
├── Exercice8/
│   ├── calculateur.html  (Mini-projet : simulateur de prêt bancaire, mensualité et intérêts)
│   └── script.js
├── assets/
│   └── style.css         (Feuille de styles unifiée, responsive et moderne)
└── README.txt            (Ce document)

--------------------------------------------------------------------------------
2. CHOIX TECHNIQUES ET BONNES PRATIQUES IMPLÉMENTÉES
--------------------------------------------------------------------------------
- Séparation des responsabilités : Tout le code JavaScript est isolé dans des fichiers
  script.js dédiés, appelés en fin de balise <body> pour un chargement optimal du DOM.
- Validation systématique : Contrôle systématique des valeurs vides, des saisies non
  numériques (isNaN, Number.isInteger), des valeurs négatives et des dépassements de bornes.
- Double mode pour les exercices de découverte :
  * Exercices 1 à 3 : Disponibilité de boutons avec prompt()/alert() conformes au cours,
    ET interfaces graphiques intégrées dans la page (Bonus).
  * Exercice 2 : Utilisation d'une véritable boucle do...while pour le jeu du nombre secret.
  * Exercice 4 : Utilisation conforme de document.forms['monFormulaire'].elements['...'].
  * Exercice 5 : Écouteur en direct 'input' avec comptage intelligent des mots par Regex.
  * Exercice 6 : Implémentation exacte des fonctions Aleatoire() et Aleatoire2(min, max).
  * Exercice 7 : Formatage de l'heure avec padStart(2, "0") et date complète en français.
  * Exercice 8 : Application de la formule financière universelle d'amortissement avec
    prise en compte spécifique du cas taux nul (0%) et calcul du coût total du crédit.

--------------------------------------------------------------------------------
3. TESTS EFFECTUÉS
--------------------------------------------------------------------------------
- Console du navigateur vérifiée (aucune erreur rouge).
- Affichage du message de l'Atelier 0 : "Formation D-CLIC – fonctions simples JavaScript".
- Test des cas d'erreurs (valeurs négatives, texte dans un champ numérique, dates erronées).
- Vérification de la compatibilité sur les navigateurs récents.
