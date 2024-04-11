import classNames from "classnames";
import styles from "./Card.module.scss";
import React, { ReactNode } from "react";

type Props = {
  propsStyles?: React.CSSProperties;
  children?: ReactNode;
  className?: string;
};

export default function Card({ className, propsStyles, children }: Props) {
  return (
    <div
      className={classNames("swiper-no-swiping", styles.card, className)}
      style={propsStyles}
    >
      {children}
    </div>
  );
}
