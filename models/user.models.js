import { DataTypes } from "sequelize";

const defineUsers = (sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("mahasiswa", "admin"),
        defaultValue: "mahasiswa",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Notes, {
      foreignKey: "user_id",
      as: "notes",
    });
  };
  return Users;
};

export default defineUsers;
