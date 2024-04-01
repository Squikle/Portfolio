import classNames from "classnames";
import styles from "./InfoCard.module.scss";
import React, { ReactNode } from "react";

type Props = {
  propsStyles?: React.CSSProperties;
  children?: ReactNode;
};

export default function InfoCard({ propsStyles, children }: Props) {
  return (
    <div className={classNames(styles.card)} style={propsStyles}>
      {children}
    </div>
  );
}
