export const isEmail = (email: string) => {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return emailPattern.test(email);
};
