import classNames from "classnames";
import styles from "./Tooltip.module.scss";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  tailClassName?: string;
  dataProps?: any;
  onMouseOver?: () => void
} & Options;

type Options = {
  position?: ArrowPosition;
};

type ArrowPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "right-bottom"
  | "none";

export default function Tooltip({
  children,
  className,
  tailClassName,
  onMouseOver,
  position = "none",
  dataProps = {},
}: Props) {
  return (
    <div
      className={classNames(styles.tooltip, styles[position], className)}
      {...dataProps}
      onMouseOver={onMouseOver}
    >
      {children}
      {position != "none" ? (
        <div className={classNames(styles.tail, tailClassName)}></div>
      ) : null}
    </div>
  );
}
