import { useEffect } from "react";
import { throttle } from "../../utils/throttle.ts";

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
    const xPercent = (xValue / window.innerWidth) * 100;
    const yPercent = (yValue / window.innerHeight) * 100;
    update(xPercent, yPercent, elementsToUpdate);
  };

  function update(x: number, y: number, elementsToUpdate: HTMLElement[]): void {
    if (elementsToUpdate == null || !isActive) return;

    elementsToUpdate.forEach((el) => {
      const dataset = el.dataset as unknown as ParallaxDataset;
      const xSpeed = dataset.speedX * 5.5;
      const ySpeed = dataset.speedY * 4;
      const zSpeed = dataset.speedZ * 4;

      const leftOfEl =
        parseFloat(getComputedStyle(el).left) - el.offsetWidth / 2;
      const leftOfElInPercent = (leftOfEl / el.offsetWidth) * 100;
      const isInLeftHalf = leftOfEl < window.innerWidth / 2 ? 1 : -1;
      const zValue = (x - leftOfElInPercent) * isInLeftHalf;

      const xOffsetX = x * xSpeed;
      const yOffset = y * ySpeed;
      const zOffset = zValue * zSpeed;

      window.requestAnimationFrame(() => {
        el.style.setProperty(cssProps.xTranslate, `${xOffsetX}px`);
        el.style.setProperty(cssProps.yTranslate, `${yOffset}px`);
        el.style.setProperty(cssProps.zTranslate, `${zOffset}px`);
      });

      const speedRotY = dataset.speedRotY || zSpeed;
      const speedRotX = dataset.speedRotX;
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
    const strength = 0.04;
    const rotateDegreeY = x * speedRotY * strength;

    window.requestAnimationFrame(() => {
      el.style.setProperty(cssProps.yRotate, `${rotateDegreeY}deg`);
    });

    if (speedRotX) {
      const rotateDegreeX = y * speedRotX * strength;
      window.requestAnimationFrame(() => {
        el.style.setProperty(cssProps.xRotate, `${-rotateDegreeX}deg`);
      });
    }
  }

  useEffect(() => {
    const container = document.querySelector(".parallax-container")!;
    const elementsToUpdate = Array.from(
      container.querySelectorAll<HTMLElement>(".parallax"),
    );

    const handleMouseUpdate = throttle((e: MouseEvent) => {
      handleUpdate(e.clientX, e.clientY, elementsToUpdate);
    }, 0);

    const handleTouchUpdate = throttle((e: TouchEvent) => {
      const lastTouch = e.changedTouches[e.changedTouches.length - 1];
      handleUpdate(lastTouch.clientX, lastTouch.clientY, elementsToUpdate);
    }, 0);

    const reset = () => {
      update(0, 0, elementsToUpdate);
    };

    reset();
    container.addEventListener("mousemove", handleMouseUpdate);
    container.addEventListener("touchmove", handleTouchUpdate, {
      passive: true,
    });
    container.addEventListener("mouseleave", reset);
    container.addEventListener("touchend", reset);

    return () => {
      container.removeEventListener("mousemove", handleMouseUpdate);
      container.removeEventListener("touchmove", handleTouchUpdate);
      container.removeEventListener("mouseleave", reset);
      container.removeEventListener("touchend", reset);
    };
  }, [isActive]);
}
