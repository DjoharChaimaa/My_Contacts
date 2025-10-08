# MyContacts - Application de Gestion de Contacts

Une application full-stack moderne pour gérer vos contacts personnels avec authentification sécurisée.

---

## Fonctionnalités

- **Authentification** : Inscription et connexion sécurisées  
- **Gestion des contacts** : CRUD complet (Create, Read, Update, Delete)  
- **Recherche** : Recherche rapide par nom, prénom ou téléphone  
- **Interface moderne** : Design responsive et intuitive  
- **Sécurité** : JWT et validation des données  
- **Documentation API** : Swagger intégré  

---

## Technologies Utilisées

### Backend

- **Node.js** : Runtime JavaScript  
- **Express.js** : Framework web  
- **MongoDB** : Base de données NoSQL  
- **Mongoose** : ODM pour MongoDB  
- **JWT** : Authentification  
- **bcrypt** : Hashage des mots de passe  
- **Swagger** : Documentation API  
- **CORS** : Gestion des origines cross-domain  

### Frontend

- **React** : Librairie UI  
- **React Router** : Navigation  
- **CSS3** : Styles modernes  

---

## Prérequis

- Node.js  
- MongoDB (local ou Atlas)  
- npm ou yarn  

---

## Setup Rapide

### Backend

```bash
cd server
npm install
```

Créer un fichier `.env` avec :

```env
MONGODB_URI=<mongodb_ri>
APP_PORT=3001
JWT_SECRET=secret
NODE_ENV=development
CLIENT_URL=http://host:8082
```

```bash
node server.js
```

### Frontend

```bash
cd client
npm install
```

Créer un fichier `.env` avec :

```env
VITE_API_URL=http://host:3001
```

```bash
npm run dev
```

---

## URLs de l'Application

- **Application** : [http://host:8082](http://host:8082)
- **Backend API** : [http://host:3001](http://host:3001)
- **Documentation API** : [http://host:3001/api-docs](http://host:3001/api-docs)

---

## API Endpoints

### Authentication

| Méthode | Endpoint         | Description      | Body                                 |
| ------- | ---------------- | --------------- | ------------------------------------- |
| POST    | /auth/register   | Créer un compte | `{firstName, lastName, email, password, phone}` |
| POST    | /auth/login      | Connexion       | `{email, password}`                  |

### Contacts (Authentification requise)

| Méthode | Endpoint                | Description         | Headers                        |
| ------- | ----------------------- | ------------------- | ------------------------------ |
| GET     | /contacts               | Liste des contacts  | Authorization: Bearer `<token>`|
| GET     | /contacts/:id           | Détail d'un contact | Authorization: Bearer `<token>`|
| POST    | /contacts/create        | Créer un contact    | Authorization: Bearer `<token>`|
| PATCH   | /contacts/update/:id    | Modifier un contact | Authorization: Bearer `<token>`|
| DELETE  | /contacts/delete/:id    | Supprimer un contact| Authorization: Bearer `<token>`|

---

## Comptes de Test

**Compte de démonstration :**

```json
{
  "email": "demo@mycontacts.com",
  "password": "demo123"
}
```

**Créer votre propre compte :**

- Allez sur [http://host:8082/register](http://host:8082/register)
- Remplissez le formulaire :
  - Prénom : Votre prénom
  - Nom : Votre nom
  - Email : Une adresse email valide
  - Téléphone : 10-20 caractères
  - Mot de passe : 6 caractères minimum

---

## Sécurité

- **Mots de passe** : Hashés avec bcrypt  
- **Authentification** : JWT avec expiration  
- **Validation** : Données validées côté client et serveur  
- **CORS** : Configuré pour l'origine du frontend  

---

## Utilisation

- **Inscription/Connexion** : Créez un compte ou connectez-vous
- **Ajouter un contact** : Cliquez sur "Ajouter un contact"
- **Rechercher** : Utilisez la barre de recherche
- **Modifier** : Cliquez sur "Modifier" sur un contact
- **Supprimer** : Cliquez sur "Supprimer" (avec confirmation)