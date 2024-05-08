import { LoginSchema } from '../schema';

type Data = {
  id: string;
  name: string;
  email: string;
};

export const loginUser = async (
  values: LoginSchema
): Promise<{ message?: string; accessToken?: string; data: Data }> => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  const data = await res.json();

  if (!res.ok) return data;

  return data;
};
