export type ApiResponse = {
  status: Status
}

export const Status = {
  Success: 200 as 200,
  NotFound: 404 as 404
};

export type Status = (typeof Status)[keyof typeof Status];
