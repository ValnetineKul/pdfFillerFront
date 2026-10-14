export type Box = { x0: number; y0: number; x1: number; y1: number };

type Band = Box & { trans: number };

function luminance(data: Uint8ClampedArray, width: number, x: number, y: number): number {
  const cx = Math.max(0, Math.min(width - 1, x));
  const index = (y * width + cx) * 4;
  return (
    0.299 * (data[index] ?? 0) +
    0.587 * (data[index + 1] ?? 0) +
    0.114 * (data[index + 2] ?? 0)
  );
}

function rowPaper(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  y: number,
): number {
  const values: Array<number> = [];
  const cy = Math.max(0, Math.min(height - 1, y));
  for (let x = 8; x < width - 8; x += 4) {
    values.push(luminance(data, width, x, cy));
  }
  values.sort((left, right) => left - right);
  return values[Math.floor(values.length * 0.8)] ?? 0;
}

function rowScore(
  data: Uint8ClampedArray,
  width: number,
  y: number,
): { trans: number; solid: number; occupancy: number; x0: number; x1: number } {
  const margin = Math.floor(width * 0.04);
  const values: Array<number> = [];
  for (let x = margin; x < width - margin; x += 2) {
    values.push(luminance(data, width, x, y));
  }
  const sorted = [...values].sort((left, right) => left - right);
  const p90 = sorted[Math.floor(sorted.length * 0.9)] ?? 0;
  const threshold = Math.min(p90 - 35, 150);
  const bucketWidth = 16;
  const buckets = new Map<number, number>();
  let trans = 0;
  let previous = false;
  for (let x = margin; x < width - margin; x += 2) {
    const ink = luminance(data, width, x, y) < threshold;
    if (ink) {
      const bucket = Math.floor(x / bucketWidth);
      buckets.set(bucket, (buckets.get(bucket) ?? 0) + 1);
    }
    if (ink !== previous) {
      trans += 1;
    }
    previous = ink;
  }
  const solid = [...buckets.entries()]
    .filter(([, count]) => count >= 2)
    .map(([key]) => key)
    .sort((left, right) => left - right);
  const span = solid.length ? (solid.at(-1) ?? 0) - (solid[0] ?? 0) + 1 : 0;
  return {
    trans,
    solid: solid.length,
    occupancy: span ? solid.length / span : 0,
    x0: solid.length ? (solid[0] ?? 0) * bucketWidth : 0,
    x1: solid.length ? ((solid.at(-1) ?? 0) + 1) * bucketWidth : 0,
  };
}

export function passportTextBands(page: Box): Array<Box> {
  const height = page.y1 - page.y0;
  const bandHeight = Math.max(48, Math.round(height * 0.22));
  const step = Math.max(24, Math.round(bandHeight / 2));
  const x0 = page.x0 + Math.round((page.x1 - page.x0) * 0.26);
  const x1 = page.x0 + Math.round((page.x1 - page.x0) * 0.9);
  const bands: Array<Box> = [];
  for (let y = page.y0; y < page.y1 - 20; y += step) {
    bands.push({
      x0,
      x1,
      y0: y,
      y1: Math.min(page.y1, y + bandHeight),
    });
  }
  return bands;
}

export function locatePassportPage(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): { page: Box; mrz: Box } | null {
  const papers: Array<number> = [];
  for (let y = 8; y < height - 8; y += 16) {
    papers.push(rowPaper(data, width, height, y));
  }
  if (papers.length === 0) {
    return null;
  }
  const paperFloor = Math.max(80, Math.max(...papers) * 0.68);
  const hits: Array<Band> = [];
  for (let y = 8; y < height - 8; y += 2) {
    const score = rowScore(data, width, y);
    if (
      score.trans >= 20 &&
      score.solid >= 8 &&
      score.occupancy >= 0.5 &&
      score.x1 - score.x0 > width * 0.4 &&
      rowPaper(data, width, height, y) >= paperFloor
    ) {
      hits.push({
        x0: score.x0,
        x1: score.x1,
        y0: y,
        y1: y,
        trans: score.trans,
      });
    }
  }

  const clusters: Array<Band> = [];
  for (const row of hits) {
    const last = clusters.at(-1);
    if (last && row.y0 - last.y1 <= 18) {
      last.y1 = row.y1;
      last.x0 = Math.min(last.x0, row.x0);
      last.x1 = Math.max(last.x1, row.x1);
      last.trans = Math.max(last.trans, row.trans);
    } else {
      clusters.push({ ...row });
    }
  }

  const bands = clusters.filter((cluster) => {
    const bandHeight = cluster.y1 - cluster.y0;
    return bandHeight >= 8 && bandHeight <= 100;
  });
  const lower = bands.at(-1);
  const previous = bands.at(-2);
  if (!lower) {
    return null;
  }
  const mrz =
    previous && lower.y0 - previous.y1 < 48 && lower.y0 - previous.y1 > 0
      ? {
          x0: Math.min(previous.x0, lower.x0),
          x1: Math.max(previous.x1, lower.x1),
          y0: previous.y0,
          y1: lower.y1,
        }
      : lower;
  const pad = 12;
  const x0 = Math.max(0, mrz.x0 - pad);
  const x1 = Math.min(width, mrz.x1 + pad);
  const y1 = Math.min(height, mrz.y1 + 8);
  const pageHeight = Math.round((x1 - x0) * 0.7);
  return {
    mrz: {
      x0,
      x1,
      y0: Math.max(0, mrz.y0 - pad),
      y1: Math.min(height, mrz.y1 + pad),
    },
    page: {
      x0,
      x1,
      y0: Math.max(0, y1 - pageHeight),
      y1,
    },
  };
}
