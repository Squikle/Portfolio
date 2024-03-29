import { ImageSize } from "../../types/imageData";

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

export function adaptParticles(
  defaultOptions: any,
  { width, height }: ImageSize,
) {
  const ratio = window.devicePixelRatio;

  const newOptions = structuredClone(defaultOptions);
  if (ratio <= 1) {
    newOptions.detectRetina = true;
  }

  let screenScale = calculateScaleForScreen(
    width,
    height,
    window.devicePixelRatio,
  );
  if (newOptions.canvasMask) {
    newOptions.canvasMask.scale = screenScale;
    if (ratio <= 1.5) screenScale = Math.log((screenScale + 1) * 3) * 2;
  }
  if (newOptions.particles) {
    newOptions.particles.move.distance.horizontal *= screenScale * 0.1;
    newOptions.particles.move.distance.vertical *= screenScale * 0.1;
    newOptions.particles.move.speed.min *= screenScale * 0.1;
    newOptions.particles.move.speed.max *= screenScale * 0.1;
    //let before = newOptions.particles.number.value;
    newOptions.particles.number.value *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.12) * 1.3;
    //console.log(before, "=number=>", newOptions.particles.number.value);

    //before = newOptions.particles.size.value.max;
    newOptions.particles.size.value.min *= screenScale * 0.14;
    newOptions.particles.size.value.max *= screenScale * 0.14;
    //console.log(before, "=size=>", newOptions.particles.size.value.max);
    newOptions.particles.stroke.width *= screenScale * 0.5;
    newOptions.particles.links.distance *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.09) * 2;
    newOptions.particles.links.width *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.11) * 0.6;
  }

  if (newOptions.interactivity) {
    if (newOptions.interactivity.modes?.bubble) {
      newOptions.interactivity.modes.bubble.distance *= screenScale * 0.15;
      newOptions.interactivity.modes.bubble.size *= screenScale * 0.15;
    }
    if (newOptions.interactivity.modes?.attract) {
      newOptions.interactivity.modes.attract.distance *= screenScale * 0.2;
      newOptions.interactivity.modes.attract.speed *= screenScale * 0.1;
    }
    if (newOptions.interactivity.modes?.connect) {
      newOptions.interactivity.modes.connect.distance *=
        Math.pow(5, (screenScale / window.devicePixelRatio) * 0.12) * 0.3;
      newOptions.interactivity.modes.connect.radius *=
        Math.pow(5, (screenScale / window.devicePixelRatio) * 0.12) * 0.5;
      newOptions.interactivity.modes.connect.opacity *=
        Math.pow(5, (screenScale / window.devicePixelRatio) * 0.12) * 0.09;
      newOptions.interactivity.modes.connect.width *=
        Math.pow(5, (screenScale / window.devicePixelRatio) * 0.2) * 0.02;
    }
    if (newOptions.interactivity.modes?.grab) {
      newOptions.interactivity.modes.grab.distance *=
        Math.pow(5, (screenScale / window.devicePixelRatio) * 0.07) * 0.9;
      newOptions.interactivity.modes.grab.links.opacity *=
        Math.pow(5, (screenScale / window.devicePixelRatio) * 0.12) * 0.4;
    }
  }

  return newOptions;
}

export function adaptEmitter(
  emitterOptions: any,
  { width, height }: ImageSize,
) {
  const ratio = window.devicePixelRatio;

  let screenScale = calculateScaleForScreen(
    width,
    height,
    window.devicePixelRatio,
  );

  if (ratio < 1) return emitterOptions;
  const newOptions = structuredClone(emitterOptions);
  if (newOptions.particles) {
    if (newOptions.particles.animation) {
      newOptions.particles.animation.speed *= screenScale * 0.1;
      newOptions.particles.move.speed.min *= screenScale * 0.1;
    }
    newOptions.particles.move.speed.max *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.15) * 0.3;
    newOptions.particles.move.speed.min *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.15) * 0.3;
    newOptions.particles.life.duration.value *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.1) * 0.6;
    newOptions.particles.size.value.min *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.4) * 0.12;
    newOptions.particles.size.value.max *=
      Math.pow(5, (screenScale / window.devicePixelRatio) * 0.4) * 0.12;
  }

  if (newOptions.size) {
    newOptions.size.height *= screenScale * 0.14;
  }

  return newOptions;
}
