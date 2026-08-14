// Lightweight in-browser color extraction (no external deps).
// Samples an image onto a small canvas to find its dominant hue(s), then
// builds a harmonious 4-color palette around that hue (analogous + a
// complementary pop for contrast). This keeps the page feeling vivid and
// "alive" even for muted, sepia, or black & white artist photos, while the
// palette is still genuinely rooted in that artist's image.

export const DEFAULT_PALETTE = ['#F2A60C', '#1DB954', '#8B5CF6', '#EC4899'];

const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
};

const hueToRgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

const hslToHex = (h, s, l) => {
  h = ((h % 1) + 1) % 1;
  if (s === 0) {
    const v = Math.round(l * 255);
    return rgbToHex(v, v, v);
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hueToRgb(p, q, h) * 255);
  const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);
  return rgbToHex(r, g, b);
};

const hueDistance = (a, b) => {
  const d = Math.abs(a - b) % 1;
  return Math.min(d, 1 - d);
};

/**
 * Resolves with an array of 4 hex color strings derived from the given image
 * URL's dominant colors. Falls back to DEFAULT_PALETTE if the image fails to
 * load or can't be sampled (e.g. blocked by CORS).
 */
export const extractPalette = (imageUrl) =>
  new Promise((resolve) => {
    if (!imageUrl) {
      resolve(DEFAULT_PALETTE);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const fallback = () => resolve(DEFAULT_PALETTE);

    img.onload = () => {
      try {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const buckets = new Map();

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 200) continue;

          const brightness = (r + g + b) / 3;
          if (brightness < 16 || brightness > 242) continue; // skip near-black/near-white

          const key = `${Math.round(r / 24)},${Math.round(g / 24)},${Math.round(b / 24)}`;
          const bucket = buckets.get(key) || { r: 0, g: 0, b: 0, count: 0 };
          bucket.r += r;
          bucket.g += g;
          bucket.b += b;
          bucket.count += 1;
          buckets.set(key, bucket);
        }

        const candidates = Array.from(buckets.values())
          .map((bucket) => {
            const r = Math.round(bucket.r / bucket.count);
            const g = Math.round(bucket.g / bucket.count);
            const b = Math.round(bucket.b / bucket.count);
            const hsl = rgbToHsl(r, g, b);
            // Weight strongly favors saturated, frequent colors so genuinely
            // colorful regions of the photo (not just the biggest gray mass)
            // define the palette's hue.
            const weight = bucket.count * (0.15 + hsl.s * 1.6);
            return { r, g, b, hsl, weight };
          })
          .sort((a, b) => b.weight - a.weight);

        if (candidates.length === 0) {
          fallback();
          return;
        }

        const primary = candidates[0];
        const secondary =
          candidates.find((c) => hueDistance(c.hsl.h, primary.hsl.h) > 0.12) || null;

        const primaryHue = primary.hsl.h;
        const secondaryHue = secondary ? secondary.hsl.h : (primaryHue + 0.08) % 1;

        // Analogous secondary + complementary/triadic pops keep the palette
        // lively and harmonious no matter how monochrome the source photo is.
        const hues = [
          primaryHue,
          secondaryHue,
          (primaryHue + 0.5) % 1,
          (primaryHue + 0.32) % 1,
        ];

        const baseSaturation = Math.min(0.85, Math.max(0.6, primary.hsl.s * 1.6 + 0.25));
        const lightness = [0.56, 0.5, 0.58, 0.52];
        const saturation = [baseSaturation, baseSaturation - 0.05, baseSaturation, baseSaturation - 0.08];

        const hexColors = hues.map((h, i) => hslToHex(h, Math.max(0.5, saturation[i]), lightness[i]));

        resolve(hexColors);
      } catch (error) {
        fallback();
      }
    };

    img.onerror = fallback;
    img.src = imageUrl;
  });
