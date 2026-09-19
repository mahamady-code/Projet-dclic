# Spécifications Fonctionnelles du Prototype Figma

**Projet** : Portfolio Professionnel Personnel  
**Apprenant** : KABORE Mahamady  
**Formation** : D-CLIC - Développement Web (Semaine 6 - Projet Final)  
**Outil** : Figma (Desktop 1200px / Mobile 375px)

---

## 1. Vue d'ensemble des Écrans et Frames Figma

Le projet Figma est structuré autour de deux flux principaux interconnectés :
1. **Frame Desktop (1200px x auto)** :
   - Header fixe avec logo, barre de navigation, bouton CTA.
   - Section Hero avec H1, accroche, doubles boutons CTA et avatar.
   - Section À propos (H2) avec présentation du profil et indicateurs de formation.
   - Section Compétences (H2) en grille 3 colonnes.
   - Section Projets (H2) en grille 3 colonnes avec tags et liens d'action.
   - Section Contact (H2) avec encart de coordonnées et formulaire complet.
   - Footer avec mentions d'écoconception et liens secondaires.

2. **Frame Mobile (375px x auto)** :
   - Header compact avec menu hamburger interactif et overlay déroulant plein écran.
   - Hero adapté en colonne unique avec centrage des éléments.
   - Grilles de compétences et projets adaptées en une seule colonne fluide.
   - Formulaire ergonomique adapté à la saisie tactile (zones tactiles >= 44x44px).

---

## 2. Détail des 6 Interactions Majeures Implémentées

### Interaction 1 : Ouverture et Fermeture du Menu Burger Mobile
- **Déclencheur** : On click / Tap sur le bouton hamburger #burger-btn.
- **Action Figma** : Open Overlay (Transition : Slide down ou Fade in, 250ms ease-out).
- **Comportement accessible** :
  - Mise à jour dynamique de ria-expanded="true" / alse.
  - Fermeture automatique par clic sur un lien du menu, sur la croix de fermeture, ou par la touche Escape.

### Interaction 2 : Défilement Fluide vers les Ancres (Smooth Scroll)
- **Déclencheur** : On click sur l'un des liens de navigation (#apropos, #competences, #projets, #contact).
- **Action Figma** : Scroll to target frame/section avec transition douce (Animate: Smart Animate / Ease in-out 400ms).
- **Comportement accessible** : L'en-tête reste fixe (position: sticky) sans masquer le haut du titre de la section cible (scroll-margin-top: 80px).

### Interaction 3 : Filtrage Dynamique des Réalisations
- **Déclencheur** : On click sur les filtres de catégories ("Tous", "CSS3", "JavaScript", "Web").
- **Action Figma** : Change to variant avec transition opacité.
- **Comportement accessible** : L'état actif du filtre est mis en évidence visuellement et vocalisé via ria-pressed="true".

### Interaction 4 : Survol (Hover) et Focus Clavier sur les Cartes Projets
- **Déclencheur** : While hovering / Focus au clavier (Tab).
- **Action Figma** : Élévation légère de la carte (	ranslateY(-6px)), projection d'une ombre douce et halo bleu contrasté (order-color: #2563eb).
- **Comportement accessible** : Respect strict du mode prefers-reduced-motion sans effet de secousse.

### Interaction 5 : Validation Contextuelle en Temps Réel du Formulaire
- **Déclencheur** : On change / On leave (blur) sur les champs Nom, Email, Sujet, Message.
- **Action Figma** : Changement d'état des composants de formulaire (Neutre -> Invalide avec bordure rouge + message d'erreur d'assistance, ou Neutre -> Valide avec bordure verte et coche).
- **Comportement accessible** : Utilisation des attributs ria-invalid et liaison des messages d'erreur via ria-describedby.

### Interaction 6 : Soumission et Confirmation d'Envoi (Feedback Toast)
- **Déclencheur** : On click sur le bouton de soumission "Envoyer le message" (lorsque les champs sont valides).
- **Action Figma** : Affichage d'un état de chargement temporaire, suivi d'un bandeau de succès Toast en haut ou au centre de l'écran avec message "Votre message a été envoyé avec succès !".
- **Comportement accessible** : Le message possède ole="status" ou ole="alert" pour être lu automatiquement par les technologies d'assistance.