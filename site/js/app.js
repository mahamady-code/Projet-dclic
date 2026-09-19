/**
 * PORTFOLIO PERSONNEL - KABORE MAHAMADY
 * Formation D-CLIC - Développement Web (Semaine 6 - Projet Final)
 * Fichier JavaScript principal : Interactions, Accessibilité (a11y) et Validation
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNavLinks();
  initProjectsFilter();
  initContactForm();
  initYear();
});

/**
 * 1. Initialisation de l'année dynamique dans le footer
 */
function initYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * 2. Gestion du Menu Mobile accessible (Hamburger)
 */
function initMobileMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!burgerBtn || !siteNav) return;

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !siteNav.classList.contains('is-open');
    burgerBtn.setAttribute('aria-expanded', String(shouldOpen));
    burgerBtn.setAttribute('aria-label', shouldOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
    
    if (shouldOpen) {
      siteNav.classList.add('is-open');
    } else {
      siteNav.classList.remove('is-open');
    }
  }

  burgerBtn.addEventListener('click', () => {
    toggleMenu();
  });

  // Fermeture automatique lors du clic sur un lien du menu
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });
  });

  // Fermeture lors de l'appui sur la touche Echap (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      toggleMenu(false);
      burgerBtn.focus();
    }
  });

  // Fermeture lors d'un clic en dehors du menu
  document.addEventListener('click', (e) => {
    if (siteNav.classList.contains('is-open') && !siteNav.contains(e.target) && !burgerBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/**
 * 3. Mise en surbrillance du lien actif selon la section visible
 */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href]');

  if (!navLinks.length) return;

  const setActiveLink = (targetHref) => {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href === targetHref;

      if (isMatch) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  };

  const syncCurrentActiveLink = () => {
    const currentHash = window.location.hash;
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    if (currentHash) {
      const targetHref = currentHash;
      setActiveLink(targetHref);
      return;
    }

    if (currentPath.endsWith('index.html') || currentPath === '') {
      setActiveLink('index.html');
      return;
    }

    const matchingLink = Array.from(navLinks).find(link => {
      const href = link.getAttribute('href');
      return href && !href.startsWith('#') && href.replace(/^\.\//, '') === currentPath;
    });

    if (matchingLink) {
      setActiveLink(matchingLink.getAttribute('href'));
    }
  };

  syncCurrentActiveLink();

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(`#${id}`);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
  window.addEventListener('hashchange', syncCurrentActiveLink);
}

/**
 * 4. Filtrage dynamique des projets
 */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Met à jour l'attribut aria-pressed
      filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.removeAttribute('aria-hidden');
        } else {
          card.style.display = 'none';
          card.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/**
 * 5. Validation accessible et robuste du Formulaire de Contact
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('nom');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('sujet');
  const messageInput = document.getElementById('message');
  const messageCounter = document.getElementById('message-counter');
  const toastNotification = document.getElementById('feedback-toast');
  const submitBtn = document.getElementById('btn-submit');

  // Compteur dynamique de caractères pour le message
  if (messageInput && messageCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      messageCounter.textContent = `${len} / 10 caractères min.`;
      if (len >= 10) {
        messageCounter.style.color = 'var(--color-success)';
      } else {
        messageCounter.style.color = 'var(--color-text-muted)';
      }
    });
  }

  // Regex RFC standard pour email valide
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Valide un champ donné
   */
  function validateField(input, condition, errorMsg) {
    const formGroup = input.closest('.form-group');
    const errorDisplay = formGroup ? formGroup.querySelector('.error-message') : null;

    if (!condition) {
      if (formGroup) {
        formGroup.classList.add('has-error');
        formGroup.classList.remove('has-success');
      }
      input.setAttribute('aria-invalid', 'true');
      if (errorDisplay) {
        errorDisplay.textContent = errorMsg;
      }
      return false;
    } else {
      if (formGroup) {
        formGroup.classList.remove('has-error');
        formGroup.classList.add('has-success');
      }
      input.setAttribute('aria-invalid', 'false');
      if (errorDisplay) {
        errorDisplay.textContent = '';
      }
      return true;
    }
  }

  // Fonctions de validation unitaires
  function checkName() {
    return validateField(
      nameInput,
      nameInput.value.trim().length >= 2,
      'Veuillez indiquer votre nom complet (au moins 2 caractères).'
    );
  }

  function checkEmail() {
    return validateField(
      emailInput,
      emailRegex.test(emailInput.value.trim()),
      'Veuillez saisir une adresse email valide (ex: contact@domaine.com).'
    );
  }

  function checkSubject() {
    return validateField(
      subjectInput,
      subjectInput.value.trim().length >= 3,
      'Veuillez préciser le sujet de votre message (au moins 3 caractères).'
    );
  }

  function checkMessage() {
    return validateField(
      messageInput,
      messageInput.value.trim().length >= 10,
      'Votre message doit contenir au moins 10 caractères.'
    );
  }

  // Événements de validation en temps réel
  nameInput.addEventListener('blur', checkName);
  nameInput.addEventListener('input', () => {
    if (nameInput.closest('.form-group').classList.contains('has-error')) checkName();
  });

  emailInput.addEventListener('blur', checkEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-group').classList.contains('has-error')) checkEmail();
  });

  subjectInput.addEventListener('blur', checkSubject);
  subjectInput.addEventListener('input', () => {
    if (subjectInput.closest('.form-group').classList.contains('has-error')) checkSubject();
  });

  messageInput.addEventListener('blur', checkMessage);
  messageInput.addEventListener('input', () => {
    if (messageInput.closest('.form-group').classList.contains('has-error')) checkMessage();
  });

  // Soumission du formulaire
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = checkName();
    const isEmailValid = checkEmail();
    const isSubjectValid = checkSubject();
    const isMessageValid = checkMessage();

    const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    if (!isFormValid) {
      // Focus sur le premier champ en erreur pour l'accessibilité
      const firstInvalidField = form.querySelector('[aria-invalid="true"]');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      if (toastNotification) {
        toastNotification.className = 'feedback-toast toast-error';
        toastNotification.textContent = 'Veuillez corriger les erreurs indiquées ci-dessous avant d\'envoyer.';
        toastNotification.style.display = 'block';
      }
      return;
    }

    // État de chargement accessible
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    // Simulation d'envoi réseau sobre (600ms)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;

      if (toastNotification) {
        toastNotification.className = 'feedback-toast toast-success';
        toastNotification.innerHTML = '✔ <strong>Message envoyé avec succès !</strong> Merci, KABORE Mahamady vous répondra dans les plus brefs délais.';
        toastNotification.style.display = 'block';
        toastNotification.setAttribute('tabindex', '-1');
        toastNotification.focus();
      }

      // Réinitialisation du formulaire et des styles
      form.reset();
      const formGroups = form.querySelectorAll('.form-group');
      formGroups.forEach(fg => {
        fg.classList.remove('has-success');
        fg.classList.remove('has-error');
      });
      if (messageCounter) {
        messageCounter.textContent = '0 / 10 caractères min.';
        messageCounter.style.color = 'var(--color-text-muted)';
      }

      // Disparition douce de la notification après 7 secondes
      setTimeout(() => {
        if (toastNotification) {
          toastNotification.style.display = 'none';
        }
      }, 7000);
    }, 600);
  });
}