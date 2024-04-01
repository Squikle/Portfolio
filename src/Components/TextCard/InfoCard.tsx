import classNames from "classnames";
import styles from "./InfoCard.module.scss";
import React, { ReactNode } from "react";

type Props = {
  propsStyles?: React.CSSProperties;
  children?: ReactNode;
  className?: string;
};

export default function InfoCard({ className, propsStyles, children }: Props) {
  return (
    <div className={classNames(styles.card, className)} style={propsStyles}>
      {children}
    </div>
  );
}
