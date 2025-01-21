export const verifyEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const verifyPhoneNumber = (phone: string) => {
  const phoneRegex = /^(\+\d{2,3}[-\s]?)?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
  return phoneRegex.test(phone);
};

export const verifyCodiceFiscale = (codiceFiscale: string) => {
  const codiceFiscaleRegex =
    /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
  return codiceFiscaleRegex.test(codiceFiscale);
};
