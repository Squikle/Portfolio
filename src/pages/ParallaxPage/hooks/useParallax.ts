import React, { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { throttle } from "../../../utils/throttle.ts";
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

interface ParallaxDataset {
  speedX: number;
  speedY: number;
  speedZ: number;
  speedRotY: number;
  speedRotX: number;
}

export function useParallax(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
) {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    if (!animationFinished) return;

    getContainerAndElements()[1].forEach((x) =>
      x.classList.toggle("transition", true),
    );
  }, [animationFinished]);

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
    if (!isActive) return;

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
      const zOffset = animationFinished ? zValue * zSpeed : 0;

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

  const getContainerAndElements: () => [Element, HTMLElement[]] = () => {
    const container = containerRef.current!;
    const elementsToUpdate = Array.from(
      container.querySelectorAll<HTMLElement>(".parallax"),
    );

    return [container, elementsToUpdate];
  };

  useLayoutEffect(() => {
    const [container, elementsToUpdate] = getContainerAndElements();

    const handlePointerUpdate = throttle((e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;

      handleUpdate(e.clientX, e.clientY, elementsToUpdate);
    }, 5);

    const handleTouchUpdate = throttle((e: TouchEvent) => {
      const lastTouch = e.changedTouches[e.changedTouches.length - 1];
      handleUpdate(lastTouch.clientX, lastTouch.clientY, elementsToUpdate);
    }, 10);

    const reset = () => {
      update(0, 0, elementsToUpdate);
    };

    reset();
    container.addEventListener("pointermove", handlePointerUpdate);
    container.addEventListener("touchmove", handleTouchUpdate, {
      passive: true,
    });
    container.addEventListener("mouseleave", reset);
    container.addEventListener("touchend", reset);

    return () => {
      container.removeEventListener("pointermove", handlePointerUpdate);
      container.removeEventListener("touchmove", handleTouchUpdate);
      container.removeEventListener("mouseleave", reset);
      container.removeEventListener("touchend", reset);
    };
  }, [isActive]);

  const tweens = useParallaxAnimation(containerRef, () => {
    setAnimationFinished(true);
  });
  return tweens;
}