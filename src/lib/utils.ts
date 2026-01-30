import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const hasLetter = /[A-Za-z]/;
const hasNumber = /\d/;
export const isValidPassword = (value: string) =>
  value.length >= 8 && hasLetter.test(value) && hasNumber.test(value);
