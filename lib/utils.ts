import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import JSConfetti from "js-confetti";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const confetti = (cb: () => void) => {
  const jsConfetti = new JSConfetti();
  jsConfetti
    .addConfetti({
      confettiRadius: 5,
      confettiNumber: 500,
    })
    .then(() => cb());
};

export const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function (...args: unknown[]) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};
