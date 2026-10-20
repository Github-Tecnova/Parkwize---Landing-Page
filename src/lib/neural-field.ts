/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Rgb } from "@/lib/dot-field";

export type NeuralNode = {
  x: number;
  y: number;
  depth: number;
  phase: number;
};

export type NeuralEdge = {
  from: number;
  to: number;
};

export type NeuralPulse = {
  edge: number;
  progress: number;
  speed: number;
};

export type NeuralNetwork = {
  nodes: NeuralNode[];
  edges: NeuralEdge[];
  pulses: NeuralPulse[];
};

export type NeuralColors = {
  line: Rgb;
  node: Rgb;
  pulse: Rgb;
};

const FOCUS = { x: 0.5, y: 0.66 };
const LINKS_PER_NODE = 3;
const MAX_LINK_DISTANCE = 0.2;
const MAX_PULSES = 9;
const PULSE_SPAWN_CHANCE = 0.06;
const TRAIL = 0.16;

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function distanceToFocus(node: NeuralNode) {
  return Math.hypot(node.x - FOCUS.x, node.y - FOCUS.y);
}

export function createNetwork(count: number, aspect: number): NeuralNetwork {
  const next = random(7);
  const columns = Math.max(4, Math.round(Math.sqrt(count * aspect)));
  const rows = Math.max(3, Math.ceil(count / columns));
  const nodes: NeuralNode[] = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      nodes.push({
        x: (column + 0.15 + next() * 0.7) / columns,
        y: (row + 0.15 + next() * 0.7) / rows,
        depth: 0.35 + next() * 0.65,
        phase: next() * Math.PI * 2,
      });
    }
  }

  const edges: NeuralEdge[] = [];
  const seen = new Set<string>();

  nodes.forEach((node, index) => {
    nodes
      .map((other, otherIndex) => ({
        otherIndex,
        distance: Math.hypot((node.x - other.x) * aspect, node.y - other.y),
      }))
      .filter(
        ({ otherIndex, distance }) =>
          otherIndex !== index && distance < MAX_LINK_DISTANCE * aspect,
      )
      .sort((a, b) => a.distance - b.distance)
      .slice(0, LINKS_PER_NODE)
      .forEach(({ otherIndex }) => {
        const outer =
          distanceToFocus(node) >= distanceToFocus(nodes[otherIndex])
            ? index
            : otherIndex;
        const inner = outer === index ? otherIndex : index;
        const key = [outer, inner].sort((a, b) => a - b).join("-");
        if (seen.has(key)) return;
        seen.add(key);
        edges.push({ from: outer, to: inner });
      });
  });

  return { nodes, edges, pulses: [] };
}

export function stepNetwork(network: NeuralNetwork, delta: number) {
  network.pulses = network.pulses.filter((pulse) => {
    pulse.progress += pulse.speed * delta;
    return pulse.progress < 1 + TRAIL;
  });

  if (
    network.pulses.length < MAX_PULSES &&
    network.edges.length > 0 &&
    Math.random() < PULSE_SPAWN_CHANCE
  ) {
    network.pulses.push({
      edge: Math.floor(Math.random() * network.edges.length),
      progress: 0,
      speed: 0.35 + Math.random() * 0.35,
    });
  }
}

function rgba([r, g, b]: Rgb, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function drawNetwork(
  context: CanvasRenderingContext2D,
  network: NeuralNetwork,
  width: number,
  height: number,
  time: number,
  offset: { x: number; y: number },
  colors: NeuralColors,
) {
  const project = (node: NeuralNode) => ({
    x: node.x * width + offset.x * node.depth,
    y: node.y * height + offset.y * node.depth,
  });
  const points = network.nodes.map(project);

  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;

  network.edges.forEach(({ from, to }) => {
    const depth = (network.nodes[from].depth + network.nodes[to].depth) / 2;
    context.strokeStyle = rgba(colors.line, 0.05 + depth * 0.12);
    context.beginPath();
    context.moveTo(points[from].x, points[from].y);
    context.lineTo(points[to].x, points[to].y);
    context.stroke();
  });

  network.nodes.forEach((node, index) => {
    const breathe = 0.5 + 0.5 * Math.sin(time * 1.4 + node.phase);
    context.fillStyle = rgba(colors.node, 0.18 + node.depth * 0.35 * breathe);
    context.beginPath();
    context.arc(
      points[index].x,
      points[index].y,
      0.8 + node.depth * 1.6,
      0,
      Math.PI * 2,
    );
    context.fill();
  });

  context.globalCompositeOperation = "lighter";
  network.pulses.forEach((pulse) => {
    const { from, to } = network.edges[pulse.edge];
    const head = Math.min(pulse.progress, 1);
    const tail = Math.max(pulse.progress - TRAIL, 0);
    const start = points[from];
    const end = points[to];
    const at = (t: number) => ({
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
    });
    const headPoint = at(head);
    const tailPoint = at(tail);
    const fade = pulse.progress > 1 ? 1 - (pulse.progress - 1) / TRAIL : 1;

    const gradient = context.createLinearGradient(
      tailPoint.x,
      tailPoint.y,
      headPoint.x,
      headPoint.y,
    );
    gradient.addColorStop(0, rgba(colors.pulse, 0));
    gradient.addColorStop(1, rgba(colors.pulse, 0.85 * fade));
    context.strokeStyle = gradient;
    context.lineWidth = 1.6;
    context.beginPath();
    context.moveTo(tailPoint.x, tailPoint.y);
    context.lineTo(headPoint.x, headPoint.y);
    context.stroke();

    context.fillStyle = rgba(colors.pulse, 0.9 * fade);
    context.beginPath();
    context.arc(headPoint.x, headPoint.y, 2, 0, Math.PI * 2);
    context.fill();
  });
  context.globalCompositeOperation = "source-over";
}
