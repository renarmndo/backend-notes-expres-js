import models from "../models/index.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //   validasi
    const existingEmail = await models.Users.findOne({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({
        msg: "Email Sudah terdaftar",
      });
    }

    const existingUsername = await models.Users.findOne({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).json({
        msg: "Username Sudah terdaftar",
      });
    }

    //   hashing password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    //   simpan data
    const newUser = await models.Users.create({
      username,
      email,
      password: hashedPassword,
      role: role,
    });

    const { password: _, ...userData } = newUser.toJSON();

    res.status(201).json({
      msg: "Registrasi Berhasil",
      user: userData,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      msg: "Terjadi Kesalahan pada server saat melakukan registrasi",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validasi

    if (!email) {
      return res.status(400).json({
        msg: "Email harus diisi",
      });
    }

    if (!password) {
      return res.status(400).json({
        msg: "Password tidak boleh kosong",
      });
    }

    //   validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test) {
      return res.status(400).json({
        msg: "Format Email tidak valid",
      });
    }

    //   check apakah user sesuai dengan email
    const user = await models.Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User tidak ditemukan",
      });
    }

    // cocokan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Password Salah",
      });
    }

    //   Buat Token
    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    //   hapus password dari response
    const { password: _, ...userData } = user.toJSON();
    return res.status(200).json({
      msg: "Login Berhasil",
      user: userData,
      token: token,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      msg: "terjadi kesalahan pada server saat melakukan login",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    // console.log("userId:", req.userId);

    const user = await models.Users.findByPk(req.userId, {
      attributes: ["user_id", "username", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({
        msg: "Pengguna tidak ditemukan",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "terjadi kesalahan saat mengambil data pengguna",
    });
  }
};
