export const Status = {
  Success: 200 as 200,
  NotFound: 404 as 404,
  InternalServerError: 500 as 500
};

export type Status = (typeof Status)[keyof typeof Status];
