#  Rapport Technique – Digital Banking Application

##  Vue d'ensemble

**Digital Banking** est une solution bancaire moderne full-stack composée d’un backend en **Spring Boot** et d’un frontend en **Angular**. L'application permet la gestion des clients, des comptes bancaires (courants et épargnes), et des opérations bancaires (crédit, débit, virement), avec une authentification et autorisation basées sur les rôles via JWT.

---

## 🔧 Technologies Utilisées

### Backend (Java - Spring Boot)
- **Java 17**
- **Spring Boot 3.4.5**
- **Spring Security + JWT**
- **Spring Data JPA**
- **MySQL**
- **Lombok**
- **SpringDoc OpenAPI**
- **Spring Boot Actuator**

### Frontend (Angular)
- **Angular CLI v19.2.4**
- **TypeScript**
- **Bootstrap ou Angular Material (optionnel)**
- **JWT Authentication**
- **RxJS pour la gestion des flux asynchrones**

---

##  Backend – Architecture et Fonctionnalités

###  Architecture
- **Architecture RESTful**
- **Entity-DTO-Service-Controller Layering**
- **Séparation des responsabilités avec interfaces et implémentations**
- **Utilisation des annotations Spring : `@RestController`, `@Service`, `@Repository`, `@Entity`**

###  Entités principales
- `Customer` : id (UUID), name, email, [1-*] bankAccounts
- `BankAccount` (classe abstraite) :
  - Attributs communs : id, createdAt, balance, status, currency
  - Relations : ManyToOne `Customer`, OneToMany `Operation`
- `CurrentAccount` : hérite de `BankAccount`, ajoute `overDraft`
- `SavingAccount` : hérite de `BankAccount`, ajoute `interestRate`
- `Operation` : id, date, amount, type (CREDIT/DEBIT), bankAccount

###  DTOs
- `CustomerDTO`, `CurrentAccountDTO`, `SavingAccountDTO`, `OperationDTO`, `AccountHistoryDTO`

###  Services
- `BankAccountService` :
  - CRUD client
  - Création comptes courants et épargnes
  - Opérations bancaires : crédit, débit, virement
  - Historique de compte (avec pagination)

###  API REST – Endpoints
- **Auth** : `/auth/login`, `/auth/profile`
- **Customers** :
  - `GET /customers/list_customer` (USER)
  - `POST /customers/save` (ADMIN)
  - `PUT`, `DELETE`, `SEARCH`
- **Accounts** :
  - `GET /bank_accounts/list_bank_accounts`
  - `GET /bank_accounts/{id}/operations`
  - `GET /bank_accounts/{id}/page_operations`
  
###  Sécurité
- JWT Auth via `/auth/login`
- Utilisateurs par défaut :
  - `admin / 12345` (ADMIN, USER)
  - `user / 12345` (USER)
- **Contrôle des rôles** :
  - `USER` : lecture
  - `ADMIN` : création, suppression, mise à jour

###  Documentation
- Via **Swagger/OpenAPI** : `http://localhost:8080/swagger-ui.html`

---

##  Frontend – Architecture Angular

###  Structure
- Architecture modulaire
- `Components`, `Services`, `Guards`, `Interceptors`, `Models`
- Utilise les environnements (`environment.ts`, `environment.prod.ts`)

### Authentification et Autorisation
- **LoginComponent** : gère l’authentification
- **JWT Token** stocké dans le `localStorage`
- **Guards** :
  - `AuthenticationGuard` : vérifie l’authentification
  - `AuthorizationGuard` : vérifie le rôle requis

### Services
- `LoginService` : login, logout, gestion du token, rôle utilisateur
- `CustomersService` : accès CRUD client
- `AccountsService` : accès aux comptes bancaires et opérations

###  Composants
- `CustomersComponent`, `NewcustomerComponent` (ADMIN)
- `AccountsComponent`
- `LoginComponent`, `NavbarComponent`, `NotAuthorizedComponent`

### Modèles
- `Customer` : id, name, email
- `Account` : id, number, balance, status, type, createdAt

###  Environnement
```ts
// environment.ts
apiUrlCustomers: 'http://localhost:8080/customers',
apiUrlAccounts: 'http://localhost:8080/bank_accounts',
apiUrlLogin: 'http://localhost:8080/auth',
```

---

## 🧪 Tests

### Backend
- Tests unitaires possibles avec JUnit + Mockito
- Test de sécurité avec Spring Security Test

### Frontend
- **Unit Tests** avec Karma/Jasmine : `ng test`
- **E2E Tests** : `ng e2e` (à configurer avec Cypress ou Playwright)

---

##  Déploiement

### Backend
- Packager en `.jar` avec Maven : `mvn clean package`
- Déploiement sur serveur (Tomcat, Docker, Cloud)

### Frontend
- `ng build --configuration production`
- Déployer le contenu de `/dist` sur un serveur Nginx, Apache ou service cloud

---

##  Recommandations

- Utiliser **Docker** pour contenairiser backend + MySQL
- Ajouter **Refresh Token** pour améliorer la sécurité
- Implémenter **audit log** pour tracer toutes les opérations sensibles
- Ajouter des **tests de performance** (JMeter, Gatling)
- Sécuriser la base de données (firewall, rôles MySQL, backups)

---

##  Ressources Additionnelles

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Angular Docs](https://angular.io/docs)
- [Spring Security + JWT Guide](https://www.baeldung.com/spring-security-oauth-jwt)
- [OpenAPI (Swagger)](https://springdoc.org/)
- [JWT Debugger](https://jwt.io/)
