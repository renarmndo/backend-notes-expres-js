import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/koneksiDb.js";
import models from "./models/index.models.js";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

// server
const startServer = async () => {
  try {
    await sequelize.sync();
    // {
    //   force: true;
    // }
    console.log("semua tabel berhasil dibuat");

    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Terjadi Kesalahan pada server", error);
  }
};

startServer();
