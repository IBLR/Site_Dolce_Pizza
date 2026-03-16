# PROJET FICTIF - Site frontend interactif "La Dolce Pizza"

https://iblr.github.io/Site_Dolce_Pizza/

## Description
Le site vitrine de La Dolce Pizza a été conçu pour offrir une présentation élégante et fonctionnelle des services et produits du restaurant. Ce site vise à améliorer la visibilité de l'entreprise en ligne, tout en fournissant aux visiteurs un accès facile aux informations essentielles. Il est structuré autour de quatre pages principales :

- **Présentation du restaurant** : son univers, son histoire, ses valeurs
- **Menu** : consultation du menu, ajout de produits au panier et visualisation de la commande avant validation
- **Galerie** : présentation visuelle de plats et de l'ambiance pour séduire les clients potentiels
- **Contact & Réservation** : coordonnées et réservation en ligne


## Objectifs du Site
- **Visibilité accrue** : Fournir une vitrine en ligne pour permettre au restaurant de se faire connaître, surtout auprès de nouveaux clients.
- **Expérience utilisateur optimisée** : Créer un parcours simple et agréable pour les visiteurs, leur permettant d'explorer le menu, de voir des photos du restaurant, et de réserver facilement.
- **Accessibilité** : Offrir une navigation intuitive et rapide, sur ordinateur comme sur mobile.
- **Interaction** : Permettre aux clients de contacter facilement le restaurant pour des réservations ou des demandes spécifiques.


## Auteur
- **Nom de l'auteur** : Isabelle BAILLY LE ROCH
- **Email** : isabelleblr@outlook.fr


## Version
- 1.0.0


## Technologies Utilisées

- **Structure & Sémantique** : HTML5

- **Design & Style** : CSS3 - Flexbox / Grid - Média Queries

- **Comportement & Interactivité** : JavaScript (Vanilla JS)

- **Gestion des Données** : JSON

- **Version Control** : Git


## Architecture du Projet

```
/
├── assets/
│   ├── data/
│   │   └── products.json     # Fichier JSON (données des produits du menu)
│   ├── fonts/                # Polices de caractères
│   ├── icons/                # Icônes
│   ├── img/                  
│   │   ├── backgrounds/      # Images d'arrière-plan
│   │   ├── branding/         # Images liées à la marque
│   │   ├── pages/            # Images spécifiques aux pages
│   │   └── placeholders/     # Images de remplacement
├── css/
│   └── style.css             # Fichier CSS (style)
├── js/
│   └── script.js             # Fichier JavaScript (interactivité du site)
├── contact.html              # Page de contact et réservation
├── galerie.html              # Page de la galerie
├── index.html                # Page d'accueil
├── menu.html                 # Page du menu avec panier
└── readme/
    └── readme.md             # Ce fichier README

```


## Choix graphiques

**Placement des Éléments** :
- Menu de navigation en haut de page : accessibilité immédiate à toutes les sections du site.

- Menu de navigation en bas de page : renforcement de l'accès immédiat à toutes les sections du site.

- Hero : grande image en background, avec titre et sous-titre incitant à l'action.

- Page d'accueil : en haut, CTA vers le menu ; en-dessous, présentation en 3 blocs de l'univers, l'histoire et les valeurs du restaurant, avec photo verticale d'agrément.

- Page Menu : en haut, CTA vers le formulaire de réservation ; en dessous, à gauche, produits organisés en cartes séparées avec informations clés visibles ; à droite, encart "votre commande" fixed au scroll. Le tout permet une navigation claire et intuitive.

- Page Galerie : en haut, CTA vers le menu ; en-dessous, grille asymétrique pour attirer l'oeil.

- Page Contact & réservation : en haut, CTA vers le menu ; en-dessous, à gauche les coordonnées ; à droite formulaire de réservation aéré pour faciliter la saisie des informations.

**Lisibilité** :
- Typographie claire : deux typographies sans-serif ("Alatsi" pour les titres & "Source_sans_3" pour les textes) pour une lecture facile. Titres avec tailles dégressives pour structurer l'information.

- Espacement : marges et espacements larges pour éviter la surcharge visuelle et améliorer la clarté.

- Organisation : informations présentées en sections distinctes pour guider l'utilisateur dans sa navigation.

**Navigation** :
- Menu : menu fixé en haut pour un accès constant, avec un menu burger sur mobile pour maximiser l'espace.

- Navigation fluide : hiérarchie logique des sections avec ordre logique et progressif, navigation par ancres pour un accès direct aux sections, navigation simplifiée sur mobile grâce au menu burger, cccès direct aux actions principales (3 clics maximum)

- Appels à l'action visibles : grands CTA (réservation, menu dans hero / boutons "Valider" & "Réserver") bien positionnés pour guider l'utilisateur sans effort et encourager l'interaction.

- Responsive : design adapté à toutes les tailles d'écran, garantissant une navigation optimale sur mobile, tablette et ordinateur.

Maquette basse résolution - Desktop - Page Menu
![Maquette du menu en mode desktop](/readme/maquette-desktop-menu.jpg)

Maquette basse résolution - Mobile - Page Menu
![Maquette du menu en mode mobile](/readme/maquette-mobile-menu.jpg)


## Principales fonctionnalités

**Menu Burger (navigation Mobile)** :
Le site utilise un menu burger sur les appareils mobiles. Il peut être ouvert et fermé en cliquant sur un bouton, avec une gestion du focus pour une meilleure accessibilité.

**Affichage Dynamique du Menu et Panier** :
Les produits du menu sont chargés dynamiquement depuis un fichier JSON. Les utilisateurs peuvent ajouter des articles au panier, ajuster les quantités et consulter le total en temps réel.

**Gestion du Panier** :
Le panier permet aux utilisateurs de voir les produits ajoutés, de modifier les quantités ou de le vider. Le total est mis à jour automatiquement à chaque modification.

**Galerie d'Images avec Lightbox** :
Les utilisateurs peuvent cliquer sur les images de la galerie pour les afficher dans un lightbox, offrant une vue agrandie. Le lightbox se ferme en cliquant sur un bouton ou en dehors de l'image.

**Validation du Formulaire de Contact et Réservation** :
Le formulaire de contact permet aux utilisateurs de réserver une table. Chaque champ est validé en temps réel (nom, téléphone, date, heure, nombre de personnes) pour garantir des données correctes avant la soumission.

**Accessibilité Améliorée** :
Le site intègre des fonctionnalités d'accessibilité, telles que la gestion du focus sur les éléments interactifs et l'utilisation d'attributs ARIA pour une navigation fluide, en particulier pour les utilisateurs de lecteurs d'écran.

