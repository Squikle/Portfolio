import {RefObject, useCallback, useLayoutEffect, useState} from "react";
import {throttle} from "@/utils/throttle.ts";
import useParallaxAnimation from "./useParallaxAnimations.ts";

const cssProps = {
  xOrigTranslate: "--origTranslateX",
  yOrigTranslate: "--origTranslateY",
  xTranslate: "--translateX",
  yTranslate: "--translateY",
  zTranslate: "--translateZ",
  yRotate: "--rotateY",
  xRotate: "--rotateX",
};

type ParallaxDataset = {
  speedX: number;
  speedY: number;
  speedZ: number;
  speedRotY: number;
  speedRotX: number;
};

export function useParallax(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
) {
  const [animationFinished, setAnimationFinished] = useState(false);

  const getContainerAndElements: () => [Element, HTMLElement[]] = useCallback(() => {
    const container = containerRef.current!;
    const elementsToUpdate = Array.from(
      container.querySelectorAll<HTMLElement>(".parallax"),
    );

    return [container as Element, elementsToUpdate as HTMLElement[]];
  }, [containerRef]);

  const update = useCallback((x: number, y: number, elementsToUpdate: HTMLElement[]) => {
    if (!isActive) return;

    elementsToUpdate.forEach((el) => {
      const dataset = el.dataset as unknown as ParallaxDataset;
      const xSpeed = (dataset.speedX || 0) * 5.5;
      const ySpeed = (dataset.speedY || 0) * 4;
      const zSpeed = (dataset.speedZ || 0) * 4;

      const leftOfEl =
        parseFloat(getComputedStyle(el).left) - el.offsetWidth / 2;
      const leftOfElInPercent = (leftOfEl / el.offsetWidth) * 100;
      const isInLeftHalf = leftOfEl < window.innerWidth / 2 ? 1 : -1;
      const zValue = (x - leftOfElInPercent) * isInLeftHalf;

      const xOffsetX = x * xSpeed;
      const yOffset = y * ySpeed;
      const zOffset = animationFinished ? zValue * zSpeed : 0;

      window.requestAnimationFrame(() => {
        cssProps.xTranslate &&
        el.style.setProperty(cssProps.xTranslate, `${xOffsetX}px`);
        cssProps.yTranslate &&
        el.style.setProperty(cssProps.yTranslate, `${yOffset}px`);
        cssProps.zTranslate &&
        el.style.setProperty(cssProps.zTranslate, `${zOffset}px`);
      });

      const speedRotY = dataset.speedRotY || zSpeed;
      const speedRotX = dataset.speedRotX;
      updateRotation(x, y, el, speedRotX, speedRotY);
    });
  }, [isActive])

  const handleUpdate = useCallback((
    clientX: number,
    clientY: number,
    elementsToUpdate: HTMLElement[],
  ) => {
    const xValue = clientX - window.innerWidth / 2;
    const yValue = clientY - window.innerHeight / 2;
    const xPercent = (xValue / window.innerWidth) * 100;
    const yPercent = (yValue / window.innerHeight) * 100;
    update(xPercent, yPercent, elementsToUpdate);
  }, [update]);

  function updateRotation(
    x: number,
    y: number,
    el: HTMLElement,
    speedRotX: number,
    speedRotY: number,
  ) {
    const strength = 0.04;
    const rotateDegreeY = x * speedRotY * strength;

    if (rotateDegreeY) {
      window.requestAnimationFrame(() => {
        el.style.setProperty(cssProps.yRotate, `${rotateDegreeY}deg`);
      });
    }

    if (speedRotX) {
      const rotateDegreeX = y * speedRotX * strength;
      window.requestAnimationFrame(() => {
        el.style.setProperty(cssProps.xRotate, `${-rotateDegreeX}deg`);
      });
    }
  }

  useLayoutEffect(() => {
    const [, elementsToUpdate] = getContainerAndElements();

    const handleMouseUpdate = throttle((e: MouseEvent) => {
      handleUpdate(e.clientX, e.clientY, elementsToUpdate);
    }, 5);

    const handleTouchUpdate = throttle((e: TouchEvent) => {
      const lastTouch = e.changedTouches[0];
      handleUpdate(lastTouch.clientX, lastTouch.clientY, elementsToUpdate);
    }, 5);

    const reset = () => {
      update(0, 0, elementsToUpdate);
    };

    reset();
    window.addEventListener("mousemove", handleMouseUpdate);
    window.addEventListener("touchmove", handleTouchUpdate, {
      passive: true,
    });
    window.addEventListener("mouseleave", reset);
    window.addEventListener("touchend", reset);

    return () => {
      window.removeEventListener("mousemove", handleMouseUpdate);
      window.removeEventListener("touchmove", handleTouchUpdate);
      window.removeEventListener("mouseleave", reset);
      window.removeEventListener("touchend", reset);
    };
  }, [isActive, getContainerAndElements, handleUpdate, update]);

  return useParallaxAnimation(containerRef, () => {
    setAnimationFinished(true);
  });
}
