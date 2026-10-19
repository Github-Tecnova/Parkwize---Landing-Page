/*
 * Copyright (c) 2025-2026. Tecnova
 */

import {
  BrainCircuit,
  CarFront,
  ClipboardList,
  Clock3,
  CreditCard,
  Hourglass,
  LucideIcon,
  SearchX,
  Smartphone,
  Unplug,
  Wallet,
  Wrench,
} from "lucide-react";
import { ProductKey } from "@/lib/navigation";

export const PROBLEM_ICONS = {
  digitalSignage: [Clock3, Wrench, Unplug, BrainCircuit],
  onlineReservation: [Smartphone, CreditCard, SearchX, Unplug],
  enforcement: [CarFront, Wallet, ClipboardList, Hourglass],
} as const satisfies Partial<Record<ProductKey, readonly LucideIcon[]>>;
