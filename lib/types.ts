export type User = {
  name: string;
  email: string;
  password: string;
  accessToken: string | null;
};

export type VerifyData = {
  userId: string;
  username: string;
  email: string;
  token: string;
};
