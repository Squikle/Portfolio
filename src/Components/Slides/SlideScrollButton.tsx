import styles from "./SlidesPagination.module.scss";
import React from "react";
import classNames from "classnames";
import arrowIcon from "/public/arrow-icon.svg"

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
  className: string;
};

export default function SlideScrollButton({
  onClick,
  style,
  className,
}: Props) {
  return (
    <div
      style={style}
      className={classNames(styles.button, className)}
      onClick={onClick}
    >
      <img alt="navigation arrow" src={arrowIcon} />
    </div>
  );
}
