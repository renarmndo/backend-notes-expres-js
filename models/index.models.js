import { Sequelize } from "sequelize";
import sequelize from "../config/koneksiDb.js";
import defineUsers from "./user.models.js";
import defineNotes from "./notes.models.js";

// inisasi model
const models = {};
models.Users = defineUsers(sequelize);
models.Notes = defineNotes(sequelize);

// panggil fungsi relasi jika ada
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
