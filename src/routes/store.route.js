import express from "express";
import { addStore } from "../controllers/store.controller.js";

const router = express.Router();

router.post("/", addStore);

export { router as storeRouter };
