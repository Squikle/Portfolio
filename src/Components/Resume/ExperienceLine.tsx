import styles from "./Resume.module.scss";
import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  isFirst: boolean;
  isLast: boolean;
  length?: string;
  withDot?: boolean;
};

export function ExperienceLine({
  children,
  isFirst,
  isLast,
  length,
  withDot = true,
}: Props) {
  return (
    <div className={styles.lineContainer}>
      <div
        className={classNames(styles.line, {
          [styles.lineStart]: isFirst,
          [styles.lineEnd]: isLast,
          [styles.dot]: withDot,
        })}
        style={{ ["--additional-height"]: length } as CSSProperties}
      />
      <div className={styles.ending}>{children}</div>
    </div>
  );
}
