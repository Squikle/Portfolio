import classNames from "classnames";
import styles from "./Tooltip.module.scss";
import {ReactNode} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  tailClassName?: string;
  dataProps?: any;
  onPointerOver?: () => void
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
  onPointerOver,
  position = "none",
  dataProps = {},
}: Props) {
  return (
    <div
      className={classNames(styles.tooltip, styles[position], className)}
      {...dataProps}
      onPointerOver={onPointerOver}
    >
      {children}
      {position != "none" ? (
        <div className={classNames(styles.tail, tailClassName)}></div>
      ) : null}
    </div>
  );
}
