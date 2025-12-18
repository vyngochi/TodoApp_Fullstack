export type ResponseModel<T> = {
  statusCode?: number;
  message?: string;
  data?: T;
};
