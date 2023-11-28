import express from "express";
import { MissionController } from "../controllers/mission.controller.js";

const router = express.Router();
const missionController = new MissionController();

// 미션 도전하기 API
router.post("/challenge", missionController.challengeMission);

export { router as missionRouter };
