# PawHomes 🐾

> A modern, full-stack pet adoption platform connecting animal rescue shelters, pet owners, and prospective adopters with role-based access control, dynamic pet search, and end-to-end adoption request management.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement

Every year, animal shelters and pet owners struggle with inefficient adoption workflows, lack of centralized pet visibility, and unvetted applications. Prospective adopters often face difficulties filtering pets by specific traits (age range, species, location), while shelters lack streamlined tools to verify applicant readiness, maintain medical/living history records, and manage adoption requests securely.

**PawHomes** resolves this by delivering a transparent, centralized platform that coordinates interactions among **Adopters**, **Shelter Admins**, and **System Administrators** with strict verification protocols and fast search retrieval.

---

## 🚀 What PawHomes Does

- **Multi-Role Access Control**: Distinct capabilities and dashboards tailored for general Adopters, Shelter Administrators, and System Administrators.
- **Shelter Vetting & Approval**: Shelters submit verification documentation and details; accounts remain locked from pet management until approved by the System Admin.
- **Dynamic Pet Discovery**: Real-time multi-attribute search and filtering across pet species, age brackets, and areas.
- **Structured Adoption Applications**: Multi-point questionnaires assessing previous pet experience, veterinarian contacts, household permissions, indoor/outdoor living arrangements, and family allergy checks.
- **Shelter Pet & Request Management**: Shelters can upload pet profiles with imagery, review applications specific to their shelter's animals, and update adoption status.
- **Pet Care & Community Articles**: Educational pet care resources and guidance to prepare new adopters for pet ownership.

---

## 👨‍💻 My Role & Key Contributions

- **Full-Stack Architecture**: Designed and implemented the REST API backend using **Node.js/Express.js** and the responsive single-page frontend using **React.js**.
- **Database Query Optimization (MongoDB / Mongoose)**:
  - Engineered flexible search algorithms in the pet retrieval API using MongoDB query operators (`$gte`, `$lte` for age ranges) and case-insensitive regex pattern matching (`$regex`) for location searches.
  - Optimized relational data fetching by implementing targeted Mongoose `.populate()` pipelines with conditional match filters (`match: { shelter: req.user._id }`) and field projections to keep queries lean and responsive.
- **Responsive UI Engineering**: Designed mobile-first, responsive layouts utilizing **Bootstrap 5**, **React-Bootstrap**, and custom styling components.
- **Authentication & Security**: Built a robust authentication layer with **JWT (JSON Web Tokens)**, salted password hashing via **Bcrypt**, role-based middleware guards, and admin authorization verification.
- **File Management Pipeline**: Integrated **Multer** for local multipart storage and static serving of pet photography and shelter verification documents.

---

## 🛠️ Tech Stack

### Frontend
- **React.js 19**: Modern UI component architecture with hooks and state management
- **React Router DOM v7**: Declarative client-side routing with protected route guards
- **Bootstrap 5 & React-Bootstrap**: Responsive grid system, modals, forms, and cards
- **Axios**: HTTP client for API consumption
- **React-Toastify**: Interactive notification alerts for user actions
- **React Icons**: Iconography across dashboards and navigation

### Backend
- **Node.js & Express.js**: RESTful API service and route orchestration
- **MongoDB & Mongoose**: Document-oriented database with strict schema validation
- **JWT (`jsonwebtoken`) & `bcrypt`**: Secure token-based session management and password encryption
- **Multer**: Multipart form-data handling for file uploads
- **Express-Validator**: Input validation and sanitization
- **CORS & Dotenv**: Cross-origin policy configuration and environment security

---

## 📐 System Architecture & Diagrams

PawHomes was engineered following systematic UML diagrams and architectural workflows:

| Diagram | Description | Link |
|---|---|---|
| **System Architecture** | High-level system structure and component relationships | [Architecture Diagram](Reactapp/New%20folder/Architecture.png) |
| **Entity Relationship (ERD)** | Database schema models and relationships | [ERD Diagram](Reactapp/New%20folder/ERD.png) |
| **Data Flow Diagram (DFD)** | Information flow across users, shelters, and system components | [DFD Diagram](Reactapp/New%20folder/DfD.png) |

---

## 📸 Screenshots

<!-- TODO: Replace placeholder paths with live application screenshots -->

| Home & Pet Search | Pet Details Profile |
|:---:|:---:|
| ![Home & Search](Reactapp/New%20folder/browse.png) | ![Pet Details](Reactapp/New%20folder/Adoption.png) |

| Adoption Application Form | Shelter Dashboard |
|:---:|:---:|
| ![Adoption Form](Reactapp/New%20folder/adoptreq.png) | ![Shelter Dashboard](Reactapp/New%20folder/Shelterreq.png) |

> *TODO: Capture high-resolution desktop & mobile screenshots of the live interface.*

---

## 📋 Key Features & Endpoints

### 1. Authentication & Role Gate
- `POST /api/auth/signup` - Register a standard user or shelter account.
- `POST /api/auth/login` - Authenticate credentials and receive a 7-day JWT token. Shelters awaiting approval are blocked until confirmed.

### 2. Pet Management & Search
- `GET /api/pets/all` - Retrieve all listed pets.
- `GET /api/pets/search?petType=...&age=0-6&area=...` - Optimized query endpoint supporting category, range, and regex search.
- `GET /api/pets/:id` - Fetch single pet profile by validated MongoDB ObjectId.
- `POST /api/pets/add` - Add pet with photo upload (restricted to authorized shelters).

### 3. Shelter Workflows
- `POST /api/shelters/register` - Shelter onboarding with verification document submission.
- `GET /api/shelters/unapproved` - Admin inspection endpoint for pending shelters.
- `PUT /api/shelters/approve/:id` - Admin approval action.
- `PUT /api/shelters/reject/:id` - Admin rejection action with specified reason.

### 4. Adoption Inquiries
- `POST /api/adopt/adopt-request` - Submit adoption questionnaire for a specific pet.
- `GET /api/adopt/adoption-requests` - Retrieve shelter-filtered adoption applications using Mongoose populate filters.

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local Community Server running or MongoDB Atlas URI)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### Installation & Local Setup

#### 1. Clone the repository
```bash
git clone https://github.com/Shayan1104/pawhomes.git
cd pawhomes
```

#### 2. Backend Setup
```bash
# Navigate to the backend directory
cd Reactapp/Backend/backend-server

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and configure your values
cp .env.example .env
```

Ensure your `.env` contains:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/Pawhomes
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

Start the backend server:
```bash
npm start
# or with hot reload:
npm run dev
```
*Backend runs on `http://localhost:5000`.*

---

#### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend
cd Reactapp/frontend

# Install dependencies
npm install

# Start the React development server
npm start
```
*Frontend runs on `http://localhost:3000`.*

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

