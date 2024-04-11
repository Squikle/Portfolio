import classNames from "classnames";
import styles from "./Tooltip.module.scss";
import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  tailClassName?: string;
  dataProps?: any;
} & Options;

type Options = {
  position?: ArrowPosition;
  color?: string;
};

type ArrowPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "right-bottom"
  | "none";
type StyleCustomization = {
  "--color"?: string;
};

export default function Tooltip({
  children,
  className,
  tailClassName,
  position = "none",
  color = undefined,
  dataProps = {},
}: Props) {
  const customStyles: StyleCustomization = {
    "--color": color,
  };

  return (
    <div
      className={classNames(styles.tooltip, styles[position], className)}
      style={customStyles as CSSProperties}
      {...dataProps}
    >
      {children}
      {position != "none" ? (
        <div className={classNames(styles.tail, tailClassName)}></div>
      ) : null}
    </div>
  );
}
