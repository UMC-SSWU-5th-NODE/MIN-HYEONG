import { tempResponseDTO, flagResponseDTO } from "../dtos/temp.response.dto.js";

export const getTempData = () => {
  return tempResponseDTO("This is TEST! >.0");
};

export async function CheckFlag(flag) {
  // async 키워드 추가
  if (flag === "1") throw new Error(":( Flag is 1!!");
  else {
    return flagResponseDTO(flag);
  }
}
