# Afroboost - Product Requirements Document

## Original Problem Statement
Application de réservation de casques audio pour des cours de fitness Afroboost. Design sombre néon avec fond noir pur (#000000) et accents rose/violet.

## User Personas
- **Utilisateurs**: Participants aux cours de fitness qui réservent des casques audio
- **Coach**: Administrateur qui gère les cours, offres, réservations et codes promo

## Core Requirements

### Système de Réservation
- [x] Sélection de cours et dates
- [x] Choix d'offres (Cours à l'unité, Carte 10 cours, Abonnement)
- [x] Formulaire d'information utilisateur (Nom, Email, WhatsApp)
- [x] Application de codes promo avec validation en temps réel
- [x] Liens de paiement (Stripe, PayPal, Twint)
- [x] Confirmation de réservation avec code unique

### Mode Coach Secret
- [x] Accès par 3 clics rapides sur le copyright
- [x] Login avec credentials (coach@afroboost.com / afroboost123)
- [x] Tableau de bord avec 6 onglets

### Administration (Mode Coach)
- [x] **Réservations**: Tableau complet avec export CSV
- [x] **Concept & Visuel**: 
  - Description du concept (textarea)
  - URL Média 16:9 (YouTube/Vimeo/Image)
  - URL du Logo (Splash Screen & PWA)
- [x] **Cours**: CRUD complet avec jour, heure, lieu, lien Maps
- [x] **Offres**: 
  - Nom, Prix, URL miniature, Visible
  - Description pour icône "i" (max 150 caractères)
- [x] **Paiements**: Configuration liens Stripe/PayPal/Twint, WhatsApp Coach
- [x] **Codes Promo**: 
  - Création avec type (100%, %, CHF), valeur, bénéficiaire
  - Liste cours autorisés avec scroll
  - Bouton supprimer (poubelle rouge)
  - Import CSV

### Internationalisation (i18n)
- [x] FR, EN, DE
- [x] Changement instantané via icône globe

### Design
- [x] Fond noir pur (#000000)
- [x] Bordures néon rose/violet
- [x] Effets de lueur
- [x] Bouton paiement avec dégradé pulsant

---

## What's Been Implemented (Jan 2026)

### Améliorations de cette session (13 Jan 2026)
1. ✅ **Cadre Média 16:9**: Format strict 16:9 (paddingBottom: 56.25%) pour YouTube/Vimeo/Image
2. ✅ **Description du concept**: Textarea modifiable dans l'onglet Concept
3. ✅ **Icône "i" sur offres**: Affiche description en tooltip au survol/clic
4. ✅ **Codes promo améliorés**: 
   - Liste cours dynamique avec scroll interne
   - Bouton supprimer (🗑️) rouge pour chaque code
5. ✅ **Splash Screen**: 
   - Fond noir pur (#000000)
   - Champ URL logo configurable
   - PWA manifest créé
6. ✅ **Vérification fonctionnelle**: Tous les boutons et liens fonctionnels

### Tests
- Backend: 23/23 tests passés (pytest)
- Frontend: Toutes les fonctionnalités vérifiées

---

## Technical Architecture

```
/app/
├── backend/
│   ├── server.py       # FastAPI avec MongoDB
│   ├── requirements.txt
│   └── tests/
│       └── test_afroboost_api.py
└── frontend/
    ├── src/
    │   ├── App.js      # Composant React principal
    │   └── App.css     # Styles néon
    └── public/
        ├── index.html  # PWA meta tags
        └── manifest.json
```

### Data Models (MongoDB)
- `courses`: id, name, weekday, time, locationName, mapsUrl
- `offers`: id, name, price, thumbnail, description, visible
- `users`: id, name, email, whatsapp, createdAt
- `reservations`: id, reservationCode, userId, userName, userEmail, courseId, ...
- `discount_codes`: id, code, type, value, assignedEmail, courses, maxUses, used, active
- `concept`: id, description, heroImageUrl, logoUrl
- `payment_links`: id, stripe, paypal, twint, coachWhatsapp

---

## Prioritized Backlog

### P0 - Completed ✅
- [x] 6 améliorations demandées

### P1 - Future
- [ ] Migration complète localStorage → MongoDB (déjà fait partiellement)
- [ ] Refactoring App.js en composants modulaires

### P2 - Backlog
- [ ] Notifications email après réservation
- [ ] Historique des réservations par utilisateur
- [ ] Dashboard analytics pour le coach
- [ ] Mode sombre/clair toggle

---

## Credentials
- **Coach Login**: coach@afroboost.com / afroboost123
- **Coach Access**: 3 clics rapides sur "© Afroboost 2026"
