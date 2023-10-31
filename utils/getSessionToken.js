export const getSessionToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.token;
  }

  return null;
};
