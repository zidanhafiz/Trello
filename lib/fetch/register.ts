import { RegisterSchema } from '../schema';

export const registerNewUser = async (values: RegisterSchema) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const data = await res.json();

    switch (data.fieldError) {
      case 'email':
        return {
          data,
          error: {
            type: 'email',
            message: data.message,
          },
        };
      default:
        return {
          data,
          error: {
            type: 'root',
            message: data.message,
          },
        };
    }
  }

  const data = await res.json();

  return {
    data,
    error: null,
  };
};
