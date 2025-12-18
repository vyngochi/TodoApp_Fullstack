//login model
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponseModel = {
  accessToken: string;
  refreshToken: string;
};

//sign up model
export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignUpResponseModel = {
  Id: number;
  Email: string;
  FirstName: string;
  LastName: string;
};
