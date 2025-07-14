import { where } from "sequelize";
import models from "../models/index.models.js";

// create
export const createNotes = async (req, res) => {
  try {
    const { title, content, is_done, deadline, pinned } = req.body;
    const userId = req.user.id;

    //validasi
    if (!title) {
      return res.status(400).json({
        msg: "Judul Notes Harus Diisi",
      });
    }

    if (content && content.length > 1000) {
      return res.status(400).json({
        msg: "Isi catatan Maksimal 1000 Karakter",
      });
    }

    const newNotes = await models.Notes.create({
      user_id: userId,
      title,
      content,
      is_done,
      deadline,
      pinned,
    });

    res.status(201).json({
      msg: "Notes Berhasil Dibuat",
      data: newNotes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Terjadi kesalahan saat menambahkan Notes",
    });
  }
};

export const getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const notes = await models.Notes.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });

    if (!notes) {
      return res.status(404).json({
        msg: "Notes tidak Ditemukan",
      });
    }

    res.status(200).json({
      msg: "Catatan Berhasil diambil",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Terjadi Kesalahan saat mengambil catatan",
    });
  }
};

export const getNotesById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const notes = await models.Notes.findOne({
      where: {
        note_id: id,
        user_id: userId,
      },
    });

    if (!notes) {
      return res.status(404).json({
        msg: "Notes tidak ditemukan",
      });
    }
    res.status(200).json({
      msg: "Catatan Berhasil diambil",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Terjadi Kesalahan saat mengambil catatan",
    });
  }
};

export const updateNotes = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content, is_done, pinned, deadline } = req.body;

  try {
    const notes = await models.Notes.findOne({
      where: {
        note_id: id,
        user_id: userId,
      },
    });

    if (!notes) {
      return res.status(404).json({
        msg: "catatan tidak ditemukan atau bukan milik anda",
      });
    }

    //   update field
    await notes.update({
      title: title,
      content: content,
      is_done: is_done,
      pinned: pinned,
      deadline: deadline,
    });

    res.status(200).json({
      msg: "Catatan berhasil di update",
      date: notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "terjadi kesalahan pada server saat update data",
    });
  }
};

export const deleteNotes = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const notes = await models.Notes.findOne({
      where: {
        note_id: id,
        user_id: userId,
      },
    });

    if (!notes) {
      return res.status(404).json({
        msg: "catatan tidak ditemukan atau bukan milik anda",
      });
    }

    await notes.destroy();
    return res.status(200).json({
      msg: "Catatan berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "terjadi kesalahan pada server saat menghapus data",
    });
  }
};
