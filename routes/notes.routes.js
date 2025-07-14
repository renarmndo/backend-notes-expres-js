import express from "express";
import {
  createNotes,
  getNotes,
  getNotesById,
  updateNotes,
  deleteNotes,
} from "../controllers/notes.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

// router
router.post("/create-notes", authenticate, createNotes);
router.get("/get-notes", authenticate, getNotes);
router.get("/get-notes/:id", authenticate, getNotesById);
router.patch("/update-notes/:id", authenticate, updateNotes);
router.delete("/delete-notes/:id", authenticate, deleteNotes);

export default router;
