import styles from "./SlidesPagination.module.css";
import classNames from "classnames";
import React from "react";
import PaginationActiveBullet from "./PaginationActiveBullet.tsx";

type Props = {
  slidesCount: number;
  width: number;
  currentActive: number;
  className: string;
  style?: React.CSSProperties;
};

const DEFAULT_WIDTH = 15;

export default function PaginationBullet({
  slidesCount,
  width,
  currentActive,
  style,
  className,
}: Props) {
  const calculatedWidth = (width ? width : DEFAULT_WIDTH) * slidesCount + "px";

  return (
    <div
      style={{ ...style, width: calculatedWidth }}
      className={classNames(styles.bullet, className)}
    >
      <PaginationActiveBullet
        style={style}
        width={width}
        offset={currentActive}
      ></PaginationActiveBullet>
    </div>
  );
}
