//regex to test email correctness
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//regex to test passwordpattern protection
export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
