import { Mission } from "../models/mission.model.js";
import { MissionDTO } from "../dtos/mission.dto.js";

class MissionService {
  async challengeMission(missionDTO) {
    try {
      const mission = await Mission.create(missionDTO);
      return mission;
    } catch (error) {
      throw new Error("Failed to challenge mission.");
    }
  }
}

export { MissionService };
