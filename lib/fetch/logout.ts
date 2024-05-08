export const logoutUser = async () => {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Something error');
  }

  return await res.json();
};
