#  ShortLink Frontend

Frontend application untuk layanan URL Shortener yang dibangun menggunakan React dan Vite.

Aplikasi ini menyediakan antarmuka pengguna untuk:

- Register akun
- Login pengguna
- Membuat Short URL
- Menggunakan Custom Slug
- Melihat daftar link yang dimiliki
- Mengelola link
- Melihat profil pengguna

---

## Technologies Used

- [![React](https://img.shields.io/badge/React-blue?logo=react&logoColor=white)](https://react.dev/)
- [![Vite](https://img.shields.io/badge/Vite-purple?logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)


### Styling

- Tailwind CSS

---

## 📂 Project Structure

```text
shortlink-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   └── Reusable UI Components
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ListLink.jsx
│   │   ├── CreateShortLink.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
|
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

Pastikan telah terinstall:

- Node.js 18+
- npm atau yarn
- Git

Cek versi:

```bash
node -v
npm -v
git --version
```

---

## 1. Clone Repository

```bash
git clone https://github.com/iamhanif11/shortlink-frontend.git

cd shortlink-frontend
```

---

## 2. Install Dependencies

Menggunakan npm:

```bash
npm install
```

atau:

```bash
npm ci
```

---

## 3. Setup Environment Variables

Buat file `.env` dari template:

```env
VITE_API_URL=http://localhost:8080/api
```

Pastikan backend sudah berjalan pada URL tersebut.

---

## 4. Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di:

```text
http://localhost:5173
```

---

## 5. Build Production

```bash
npm run build
```

Hasil build akan tersedia pada folder:

```text
dist/
```

Preview hasil build:

```bash
npm run preview
```

---

## Application Routes

### Public Routes

| Route | Description |
|---------|------------|
| `/` | Landing Page |
| `/auth/` | Login Page |
| `/auth/register` | Register Page |

### Protected Routes

Memerlukan login terlebih dahulu.

| Route | Description |
|---------|------------|
| `/create-link` | User Dashboard |
| `/list-link` | Create Short Link |

### Error Route

| Route | Description |
|---------|------------|
| `*` | Not Found Page |

---

## Backend Integration

Frontend berkomunikasi dengan backend melalui:

```env
VITE_API_URL=http://localhost:8080/api
```

Contoh endpoint yang digunakan:

```text
POST /register
POST /login
DELETE /logout

POST /links
GET /links
DELETE /links/:id
GET /:slug
```

---


## Available Scripts

Menjalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

Lint project:

```bash
npm run lint
```

---

## License

This project is intended for educational and portfolio purposes.