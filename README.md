# 🗒️ Notes Server API (Backend)

API ini merupakan backend untuk aplikasi catatan digital (Notes App). Pengguna dapat membuat akun, login, dan mengelola catatan (create, read, update, delete).

---

## 🚀 Teknologi yang Digunakan

- **Node.js**
- **Express.js**
- **Sequelize** + PostgreSQL
- **JWT (JSON Web Token)**
- **bcrypt** untuk hashing password
- **dotenv** untuk konfigurasi environment
- **CORS** middleware

---

## 📦 Instalasi dan Menjalankan Project

### 1. Clone Repositori

```bash
git clone https://github.com/username/notes-server.git
cd notes-server
```

### 2. Install Dependencies

npm install

4. Jalankan Migrasi Database (Jika Menggunakan Sequelize)
   bash
   Salin
   Edit
   npx sequelize db:migrate
5. Menjalankan Server
   bash
   Salin
   Edit
   npm start
