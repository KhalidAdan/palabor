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

export interface ReadingTimeResult {
  readTime: number;
  readTimeInfo: string;
  readTimeLabel: string;
}

export interface CalculateReadingTimeProps {
  text: string;
  speed?: "fast" | "normal" | "slow";
  wpm?: number;
}

export const calculateReadingTime = ({
  text,
  speed,
  wpm: externalWpm,
}: CalculateReadingTimeProps): ReadingTimeResult => {
  const readingSpeeds = { fast: 240, normal: 180, slow: 100 };
  const wpm =
    speed && readingSpeeds[speed]
      ? readingSpeeds[speed]
      : externalWpm || readingSpeeds.normal;

  const words = text.trim().split(/\s+/).length;
  const estimatedReadTime = Math.ceil(words / wpm);

  const shortTextThresholds = { fast: 90, normal: 70, slow: 50 };
  const readerSpeedThreshold =
    speed && shortTextThresholds[speed]
      ? shortTextThresholds[speed]
      : shortTextThresholds.normal;

  const isShortText = text.length < readerSpeedThreshold;
  const readTimeLabel = `${estimatedReadTime} min${
    estimatedReadTime === 1 ? "" : "s"
  } read`;
  const readTimeInfo = isShortText
    ? "Less than a minute."
    : `Around ${estimatedReadTime} minute${
        estimatedReadTime === 1 ? "" : "s"
      }.`;

  return { readTime: estimatedReadTime, readTimeInfo, readTimeLabel };
};
