type ThrottlingFunc = (...args: any[]) => void;

export function throttle(func: ThrottlingFunc, limit: number): ThrottlingFunc {
  if (!limit) return func;

  let inThrottle = false;

  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
