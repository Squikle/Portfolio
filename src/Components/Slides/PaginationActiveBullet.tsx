import styles from "./SlidesPagination.module.css";
import classNames from "classnames";
import React, { CSSProperties } from "react";

type ExtendedCssProps = React.CSSProperties & { "--offset": number };

type Props = {
  width: number;
  style?: CSSProperties;
  offset: number;
};

export default function PaginationActiveBullet({
  width,
  style,
  offset,
}: Props) {
  return (
    <div
      style={
        {
          ...style,
          width: width + "px",
          "--offset": offset,
          margin: 0,
        } as ExtendedCssProps
      }
      className={classNames(styles.bullet, styles.active)}
    ></div>
  );
}
