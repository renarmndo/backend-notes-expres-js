import { DataTypes } from "sequelize";

const defineNotes = (sequelize) => {
  const Notes = sequelize.define(
    "Notes",
    {
      note_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tabelName: "notes",
      timestamps: true,
    }
  );

  // relasi
  Notes.associate = (models) => {
    Notes.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "users",
    });
  };
  return Notes;
};

export default defineNotes;
