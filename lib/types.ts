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

export type Todo = {
  id?: string;
  title: string;
  content: string;
  userId: string;
  finished?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
