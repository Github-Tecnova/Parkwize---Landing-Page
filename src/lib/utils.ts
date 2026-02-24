/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  addMonths,
  endOfMonth,
  isAfter,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepCloneObject<T>(data: T): T {
  return { ...data };
}

export function deepCloneArray<T>(data: T[]): T[] {
  return [...data];
}

export function makeRandomNumber() {
  const min = 500000;
  const max = 2000000;
  const randomNumber = Math.random() * (max - min) + min;
  return parseFloat(randomNumber.toFixed(2));
}

// Formats a date for the only reservation system. (Used when preloading orders)
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 19) + "Z";
}

export const formatDuration2 = (totalMinutes: number): string => {
  if (isNaN(totalMinutes)) return "0m";

  if (totalMinutes < 60) return `${totalMinutes}m`;

  return `${Math.floor(totalMinutes / 60)}h`;
};

export const formatDuration = (totalMinutes: number) => {
  if (isNaN(totalMinutes)) return "0 sec";

  // Convert to seconds for more precision when under a minute
  const totalSeconds = totalMinutes * 60;

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.round(totalSeconds % 60);

  // Under a minute, show seconds
  if (hours === 0 && minutes === 0) {
    return `${seconds} sec`;
  }
  // Only minutes, no hours
  else if (hours === 0) {
    return `${minutes} min`;
  }
  // Only hours, no minutes
  else if (minutes === 0) {
    return `${hours} hr`;
  }
  // Hours and minutes
  else {
    return `${hours} hr ${minutes} min`;
  }
};

export const formatCompactNumber = (num: number): string => {
  if (num === null || num === undefined || isNaN(num)) return "0";

  // For numbers less than 1000, just return the number
  if (Math.abs(num) < 1000) {
    return num.toString();
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum >= 1000000000) {
    return sign + (absNum / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (absNum >= 1000000) {
    return sign + (absNum / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (absNum >= 1000) {
    return sign + (absNum / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num.toString();
};

export function getCardNameFromType(cardType: string) {
  switch (cardType) {
    case "V":
      return "Visa";
    case "M":
      return "Mastercard";
    case "AX":
      return "American Express";
    case "DC":
      return "Diner's Card";
    case "NO":
      return "Novus/Discover";
    case "SE":
      return "Sears";
    case "D":
      return "INTERAC Debit";
    case "C1":
      return "JCB";
    default:
      return "Unknown";
  }
}

export const paymentMethodNames: { [num: number]: string } = {
  1: "Cash",
  2: "Visa",
  3: "Mastercard",
  4: "Amex",
  5: "Debit",
  6: "BankInstitution",
  7: "PapCheck",
  8: "BankTransfer",
  9: "Check",
  10: "Discover",
};

export function formatPaymentMethodId(paymentMethodId: number) {
  return paymentMethodNames[paymentMethodId];
}

export function serializeObject(object: any) {
  return JSON.parse(JSON.stringify(object));
}

export function deserializeObject<A>(json: any) {
  return JSON.parse(JSON.stringify(json)) as A;
}

export function formatCAD(amount: number, locale?: string): string {
  return amount.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatEUR(amount: number, locale?: string): string {
  return amount.toLocaleString(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCADSmall(amount: number, locale?: string): string {
  return amount.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function formatNumber(
  amount: number,
  fractionDigits: { max: number; min: number } = { max: 2, min: 0 },
): string {
  return amount.toLocaleString("en-CA", {
    style: "decimal",
    minimumFractionDigits: fractionDigits.min,
    maximumFractionDigits: fractionDigits.max,
  });
}

export function getWeatherCondition(condition: number) {
  switch (condition) {
    case 0: {
      return "Clear";
    }
    case 1: {
      return "Mainly clear";
    }
    case 2: {
      return "Partly cloudy";
    }
    case 3: {
      return "Overcast";
    }
    case 45: {
      return "Fog";
    }
    case 48: {
      return "Rime fog";
    }
    case 51: {
      return "Light drizzle";
    }
    case 53: {
      return "Moderate drizzle";
    }
    case 55: {
      return "Dense drizzle";
    }
    case 56: {
      return "Light freezing drizzle";
    }
    case 57: {
      return "Dense freezing drizzle";
    }
    case 61: {
      return "Rain (slight)";
    }
    case 63: {
      return "Rain (moderate)";
    }
    case 65: {
      return "Rain (heavy)";
    }
    case 66: {
      return "Freezing rain (light)";
    }
    case 67: {
      return "Freezing rain (heavy)";
    }
    case 71: {
      return "Snowfall (slight)";
    }
    case 73: {
      return "Snowfall (moderate)";
    }
    case 75: {
      return "Snowfall (heavy)";
    }
    case 77: {
      return "Snow grains";
    }
    case 80: {
      return "Rain showers (slight)";
    }
    case 81: {
      return "Rain showers (moderate)";
    }
    case 82: {
      return "Rain showers (violent)";
    }
    case 85: {
      return "Snow showers (slight)";
    }
    case 86: {
      return "Snow showers (heavy)";
    }
    case 95: {
      return "Thunderstorm (slight or moderate)";
    }
    case 99: {
      return "Thunderstorm + hail (slight / heavy)";
    }
    default: {
      return "Unknown";
    }
  }
}

export function getCompleteMonthsRange(
  fromDate: Date,
  toDate: Date,
): { adjustedFromDate: Date; adjustedToDate: Date } | null {
  let adjustedFromDate: Date;
  let adjustedToDate: Date;

  // If fromDate is the first day of month, use it; otherwise, start from next month
  if (isFirstDayOfMonth(fromDate)) {
    adjustedFromDate = fromDate;
  } else {
    adjustedFromDate = startOfMonth(addMonths(fromDate, 1));
  }

  // If toDate is the last day of month, use it; otherwise, end at previous month's last day
  if (isLastDayOfMonth(toDate)) {
    adjustedToDate = toDate;
  } else {
    adjustedToDate = endOfMonth(addMonths(toDate, -1));
  }

  // Check if we have at least one complete month
  if (isAfter(adjustedFromDate, adjustedToDate)) {
    return null; // No complete months in range
  }

  return { adjustedFromDate, adjustedToDate };
}
