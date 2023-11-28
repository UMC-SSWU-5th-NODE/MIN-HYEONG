import { MissionService } from "../services/mission.service.js";
import { MissionDTO } from "../dtos/mission.dto.js";
const missionService = new MissionService();

class MissionController {
  async challengeMission(req, res) {
    try {
      const { store_id, reward, deadline, mission_spec } = req.body;
      const missionDTO = new MissionDTO(
        store_id,
        reward,
        deadline,
        mission_spec
      );
      const newMission = await missionService.challengeMission(missionDTO);
      res.status(201).json(newMission);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { MissionController };
