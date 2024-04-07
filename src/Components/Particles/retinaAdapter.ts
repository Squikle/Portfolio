import { ImageSize } from "../Logo/types.ts";

const idealScreens = [
  [306, 228, 2, 2.2],
  [85, 63, 2, 0.45],
  [1700, 1269, 2, 14],
  [366, 273, 3, 4],
  [85, 63, 3, 0.9],
  [1700, 1269, 3, 20],
  [950, 709, 1, 3.5],
];

type Point = [diagonal: number, scale: number];
type NearestPoints = {
  prevPoint: Point | null;
  nextPoint: Point | null;
};

function calculateDiagonal(length: number, breadth: number) {
  return Math.sqrt(length * length + breadth * breadth);
}

function interpolateLinear(
  diagonal: number,
  prevPoint: Point,
  nextPoint: Point,
) {
  const [prevDiagonal, prevScale] = prevPoint;
  const [nextDiagonal, nextScale] = nextPoint;
  return (
    prevScale +
    ((diagonal - prevDiagonal) * (nextScale - prevScale)) /
      (nextDiagonal - prevDiagonal)
  );
}

function interpolateScale(diagonal: number, diagonalPoints: Point[]) {
  const nearestPoints = diagonalPoints.reduce(
    (accPoints: NearestPoints, currentPoint) => {
      const currentDiagonal = currentPoint[0];

      const prevPoint = accPoints.prevPoint;
      const nextPoint = accPoints.nextPoint;

      const prevDiagonal = prevPoint && prevPoint[0];
      const nextDiagonal = nextPoint && nextPoint[0];

      if (
        currentDiagonal <= diagonal &&
        (!prevDiagonal || currentDiagonal > prevDiagonal)
      ) {
        accPoints.prevPoint = currentPoint;
      }
      if (
        currentDiagonal >= diagonal &&
        (!nextDiagonal || currentDiagonal < nextDiagonal)
      ) {
        accPoints.nextPoint = currentPoint;
      }

      return accPoints;
    },
    { prevPoint: null, nextPoint: null },
  );

  if (!nearestPoints.prevPoint && nearestPoints.nextPoint) {
    nearestPoints.prevPoint = nearestPoints.nextPoint;
  }
  if (nearestPoints.prevPoint && !nearestPoints.nextPoint) {
    nearestPoints.nextPoint = nearestPoints.prevPoint;
  }

  if (nearestPoints.prevPoint![0] === nearestPoints.nextPoint![0]) {
    return nearestPoints.prevPoint![1];
  }

  return interpolateLinear(
    diagonal,
    nearestPoints.prevPoint!,
    nearestPoints.nextPoint!,
  );
}

function calculateScaleForScreen(
  width: number,
  height: number,
  pixelRatio: number,
) {
  const diagonalPoints = idealScreens.map((screen) => {
    const diagonal = calculateDiagonal(screen[0], screen[1]) * screen[2];
    return [diagonal, screen[3]];
  });
  diagonalPoints.sort((a, b) => a[0] - b[0]);

  const currentDiagonal = calculateDiagonal(width, height) * pixelRatio;
  return interpolateScale(currentDiagonal, diagonalPoints as Point[]);
}

export function adaptEmitter(emitterOptions: any) {
  const screenMultiplier = 1;

  const normalize = (val: number, min: number, max: number) =>
    (val - min) / (max - min);

  const diagonal = calculateDiagonal(screen.width, screen.height);

  const powAdapt = (exp: number = 1.5, flat: number = 0.1) => {
    return Math.pow(normalize(diagonal, 1, 500), exp) * flat;
  };

  const newOptions = structuredClone(emitterOptions);
  if (newOptions.particles) {
    if (newOptions.particles.animation) {
      newOptions.particles.animation.speed *= screenMultiplier;
      newOptions.particles.move.speed.min *= powAdapt(2, 0.05) * 1.2 + 1;
    }
    newOptions.particles.move.speed.max *= powAdapt(2, 0.05) * 1.2 + 1;
    newOptions.particles.move.speed.min *= powAdapt(2, 0.05) * 0.4 + 1;
    newOptions.particles.life.duration.value *= screenMultiplier;
    newOptions.particles.size.value.min *= powAdapt(2, 0.02) * 0.4 + 0.4;
    newOptions.particles.size.value.max *= powAdapt(2, 0.02) * 1.2 + 0.4;
  }

  if (newOptions.size) {
    newOptions.size.height *= screenMultiplier;
  }

  return newOptions;
}

export function adaptParticles(
  defaultOptions: any,
  { width, height }: ImageSize,
) {
  const newOptions = structuredClone(defaultOptions);

  const diagonal = calculateDiagonal(screen.width, screen.height);
  const scale = calculateScaleForScreen(width, height, devicePixelRatio);

  const screenMultiplier = 1;

  const normalize = (val: number, min: number, max: number) =>
    (val - min) / (max - min);

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const powAdapt = (exp: number = 1.5, flat: number = 0.1) => {
    return Math.pow(normalize(diagonal, 1, 500), exp) * flat;
  };

  const logAdapt = (offset: number = 1, flat: number = 0.1) => {
    return flat * Math.log(diagonal) + offset;
  };

  const rationalAdapt = (offset: number = 1, flat: number = 1) => {
    return (1 / diagonal - offset) * flat;
  };

  if (newOptions.canvasMask) {
    newOptions.canvasMask.scale *= scale * 0.3;
  }

  if (newOptions.particles) {
    newOptions.particles.move.distance.horizontal *= screenMultiplier;
    newOptions.particles.move.distance.vertical *= screenMultiplier;
    newOptions.particles.move.speed.min *= powAdapt(2, 0.005) * 0.4 + 0.3;
    newOptions.particles.move.speed.max *= powAdapt(2, 0.005) * 1.2 + 0.3;
    newOptions.particles.number.value *= clamp(
      powAdapt(2, 0.05) * 350,
      200,
      1200,
    );
    newOptions.particles.size.value.min *= powAdapt(2, 0.03) * 0.4 + 0.4;
    newOptions.particles.size.value.max *= powAdapt(2, 0.03) * 1.2 + 0.4;
    newOptions.particles.stroke.width *= powAdapt(2, 0.001) + 0.1;
    newOptions.particles.links.distance *= powAdapt(2, 0.01) * 30 + 16;
    newOptions.particles.links.width *= powAdapt(2, 0.03) + 0.4;

    if (newOptions.interactivity) {
      if (newOptions.interactivity.modes?.bubble) {
        newOptions.interactivity.modes.bubble.distance *= powAdapt(2, 2) + 200;
        newOptions.interactivity.modes.bubble.size *= clamp(
          rationalAdapt(0, 1500),
          newOptions.particles.size.value.max * 1.1,
          newOptions.particles.size.value.max * 4,
        );
      }
      if (newOptions.interactivity.modes?.attract) {
        newOptions.interactivity.modes.attract.distance *=
          clamp(rationalAdapt(0, 2000), 0, 300) + 100;
        newOptions.interactivity.modes.attract.speed *= clamp(
          rationalAdapt(0, 2000),
          0,
          300,
        );
      }
      if (newOptions.interactivity.modes?.connect) {
        newOptions.interactivity.modes.connect.distance *= powAdapt(2, 1) + 20;
        newOptions.interactivity.modes.connect.radius *=
          powAdapt(2, 0.01) + 100;
        newOptions.interactivity.modes.connect.links.opacity *=
          screenMultiplier;
        newOptions.interactivity.modes.connect.links.width *=
          powAdapt(2, 0.03) + 0.4;
        if (newOptions.interactivity.modes?.grab) {
          newOptions.interactivity.modes.grab.distance *=
            powAdapt(2, 0.1) + 120;
          newOptions.interactivity.modes.grab.links.opacity *= screenMultiplier;
        }
      }
    }

    return newOptions;
  }
}
