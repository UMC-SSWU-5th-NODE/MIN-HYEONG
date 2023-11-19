import { status } from "../config/response.status.js";
import { getTempData, CheckFlag } from "../services/temp.service.js";
import { response } from "../config/response.js";

export const tempTest = (req, res, next) => {
  res.send(response(status.SUCCESS, getTempData()));
};

export const tempException = async (req, res, next) => {
  // 비동기 함수로 변경
  console.log("/temp/exception/" + req.params.flag);

  try {
    const result = await CheckFlag(req.params.flag);
    return res.send(response(status.SUCCESS, result));
  } catch (error) {
    return res.send(response(status.ERROR, error.message));
  }
};
