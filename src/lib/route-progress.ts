/*
 * Copyright (c) 2025-2026. Tecnova
 */

type Listener = () => void;

const listeners = new Set<Listener>();

export function startRouteProgress() {
  listeners.forEach((listener) => listener());
}

export function onRouteProgressStart(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
