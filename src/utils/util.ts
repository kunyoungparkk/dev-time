const hasLetter = /[A-Za-z]/;
const hasNumber = /\d/;
export const isValidPassword = (value: string) =>
  value.length >= 8 && hasLetter.test(value) && hasNumber.test(value);
