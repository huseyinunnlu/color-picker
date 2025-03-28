import { ColorInput } from "../contexts/ColorContext";

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function getRgbValues(color: ColorInput): [number, number, number] {
  if (color.startsWith("#")) {
    const hex = color.substring(1);
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
    ];
  } else if (color.startsWith("rgb")) {
    const matches = color.match(/\d+/g);
    if (!matches || matches.length < 3) return [0, 0, 0];
    const [r, g, b] = matches;
    return [Number(r), Number(g), Number(b)];
  }
  return [0, 0, 0];
}

export function generateColorShades(color: ColorInput): {
  darkerShades: string[];
  lighterShades: string[];
} {
  const [r, g, b] = getRgbValues(color);
  const baseColorHex = rgbToHex(r, g, b);

  const darkerShades: string[] = [];
  const lighterShades: string[] = [];
  const steps = 5;

  // Generate lighter shades (towards white)
  for (let i = 0; i <= steps; i++) {
    const ratio = (steps - i) / steps;
    const newR = Math.round(r + (255 - r) * ratio);
    const newG = Math.round(g + (255 - g) * ratio);
    const newB = Math.round(b + (255 - b) * ratio);
    lighterShades.push(rgbToHex(newR, newG, newB));
  }

  // Generate darker shades (towards black)
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    const newR = Math.round(r * (1 - ratio));
    const newG = Math.round(g * (1 - ratio));
    const newB = Math.round(b * (1 - ratio));
    darkerShades.push(rgbToHex(newR, newG, newB));
  }

  return {
    lighterShades: lighterShades.filter((shade) => shade !== baseColorHex),
    darkerShades: darkerShades.filter((shade) => shade !== baseColorHex),
  };
}

export function toHexColor(color: ColorInput): string {
  const [r, g, b] = getRgbValues(color);
  return rgbToHex(r, g, b);
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgba(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

export const validateAndFormatColor = (color: string): string | null => {
  // HEX color validation
  const shortHexRegex = /^#?([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/;
  const fullHexRegex = /^#?([0-9a-fA-F]{6})$/;
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaRegex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-1](?:\.\d+)?)\s*\)$/;

  // Convert short HEX to full HEX
  if (shortHexRegex.test(color)) {
    const hex = color.startsWith("#") ? color : `#${color}`;
    return hex.replace(shortHexRegex, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`);
  }

  // Validate full HEX
  if (fullHexRegex.test(color)) {
    const hex = color.startsWith("#") ? color : `#${color}`;
    return hex.toLowerCase();
  }

  // Validate RGB format
  if (rgbRegex.test(color)) {
    const matches = color.match(rgbRegex);
    if (matches) {
      const [_, r, g, b] = matches;
      if (Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255) {
        return color;
      }
    }
  }

  // Validate RGBA format
  if (rgbaRegex.test(color)) {
    const matches = color.match(rgbaRegex);
    if (matches) {
      const [_, r, g, b, a] = matches;
      if (Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255 && Number(a) <= 1) {
        return color;
      }
    }
  }

  return null;
};

// Export the color conversion functions
export { hexToRgb, hexToRgba };
