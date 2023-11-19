import { StatusCodes } from "http-status-codes";

export const status = {
  // success
  SUCCESS: {
    status: StatusCodes.OK, //200
    isSuccess: true,
    code: 200,
    message: "success!",
  },

  //common error
  INTERNAL_SERVER_ERROR: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    isSuccess: false,
    code: 500,
    message: "Internal Server Error",
  },
  BAD_REQUEST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    status: StatusCodes.UNAUTHORIZED,
    isSuccess: false,
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    status: StatusCodes.FORBIDDEN,
    isSuccess: false,
    code: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "Not Found",
  },
  CONFLICT: {
    status: StatusCodes.CONFLICT,
    isSuccess: false,
    code: 409,
    message: "Conflict",
  },
  REQUEST_TIMEOUT: {
    status: StatusCodes.REQUEST_TIMEOUT,
    isSuccess: false,
    code: 408,
    message: "Request Timeout",
  },
  METHOD_NOT_ALLOWED: {
    status: StatusCodes.METHOD_NOT_ALLOWED,
    isSuccess: false,
    code: 405,
    message: "Method Not Allowed",
  },

  // member err
  MEMBER_NOT_FOUND: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: "MEMBER4001",
    message: "사용자가 없습니다.",
  },
  NICKNAME_NOT_EXIST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: "MEMBER4002",
    message: "닉네임은 필수입니다.",
  },

  // article err
  ARTICLE_NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: "ARTICLE4001",
    message: "게시글이 없습니다.",
  },
};
