import { useEffect } from "react";

const cssProps = {
  xOrigTranslate: "--origTranslateX",
  yOrigTranslate: "--origTranslateY",
  xTranslate: "--translateX",
  yTranslate: "--translateY",
  zTranslate: "--translateZ",
  yRotate: "--rotateY",
  xRotate: "--rotateX",
};

interface ParallaxDataset {
  speedX: number;
  speedY: number;
  speedZ: number;
  speedRotY: number;
  speedRotX: number;
}

export function useParallax(isActive: boolean) {
  const handleUpdate = (
    clientX: number,
    clientY: number,
    elementsToUpdate: HTMLElement[],
  ) => {
    const xValue = clientX - window.innerWidth / 2;
    const yValue = clientY - window.innerHeight / 2;
    update(xValue, yValue, elementsToUpdate);
  };

  function update(x: number, y: number, elementsToUpdate: HTMLElement[]): void {
    if (elementsToUpdate == null || !isActive) return;

    elementsToUpdate.forEach((el) => {
      const dataset = el.dataset as unknown as ParallaxDataset;
      const xSpeed = dataset.speedX * 0.39;
      const ySpeed = dataset.speedY * 0.39;
      const zSpeed = dataset.speedZ * 0.35;

      const leftOfEl =
        parseFloat(getComputedStyle(el).left) - el.offsetWidth / 2;
      const isInLeftHalf = leftOfEl < window.innerWidth / 2 ? 1 : -1;
      const zValue = (x - leftOfEl) * isInLeftHalf;

      const xOffsetX = x * xSpeed;
      const yOffset = y * ySpeed;
      const zOffset = zValue * zSpeed;

      el.style.setProperty(cssProps.xTranslate, `${xOffsetX}px`);
      el.style.setProperty(cssProps.yTranslate, `${yOffset}px`);
      el.style.setProperty(cssProps.zTranslate, `${zOffset}px`);

      const speedRotY =
        ((dataset.speedRotY || zSpeed) / (window.innerWidth * 0.002)) * 2;
      const speedRotX = 0;
      updateRotation(x, y, el, speedRotX, speedRotY);
    });
  }

  function updateRotation(
    x: number,
    y: number,
    el: HTMLElement,
    speedRotX: number,
    speedRotY: number,
  ) {
    const rotateDegreeY = (x / (window.innerHeight / 2)) * 10;
    el.style.setProperty(
      cssProps.yRotate,
      `${rotateDegreeY * speedRotY * 2}deg`,
    );

    if (speedRotX) {
      const xRotSpeed = speedRotX * 0.35;
      const rotateDegreeX = (y / (window.innerWidth / 2)) * -10;
      el.style.setProperty(
        cssProps.xRotate,
        `${rotateDegreeX * xRotSpeed * 10}deg`,
      );
    }
  }

  useEffect(() => {
    const elementsToUpdate = Array.from(
      document.querySelectorAll<HTMLElement>(".parallax"),
    );

    const handleMouseUpdate = (e: MouseEvent) => {
      handleUpdate(e.clientX, e.clientY, elementsToUpdate);
    };

    const handleTouchUpdate = (e: TouchEvent) => {
      const lastTouch = e.changedTouches[e.changedTouches.length - 1];
      handleUpdate(lastTouch.clientX, lastTouch.clientY, elementsToUpdate);
    };

    const reset = () => {
      update(0, 0, elementsToUpdate);
    };

    reset();
    window.addEventListener("mousemove", handleMouseUpdate);
    window.addEventListener("touchmove", handleTouchUpdate);
    window.addEventListener("mouseout", reset);
    window.addEventListener("touchend", reset);

    return () => {
      window.removeEventListener("mousemove", handleMouseUpdate);
      window.removeEventListener("touchmove", handleTouchUpdate);
      window.removeEventListener("mouseout", reset);
      window.removeEventListener("touchend", reset);
    };
  }, [isActive]);
}
