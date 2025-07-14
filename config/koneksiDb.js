import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "+07:00",
  }
);
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Koneksi Database Berhasil");
  } catch (error) {
    console.log("Koneksi Database Gagal", error);
  }
}

testConnection();

export default sequelize;
