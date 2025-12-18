//login model
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponseModel = {
  accessToken: string;
};
