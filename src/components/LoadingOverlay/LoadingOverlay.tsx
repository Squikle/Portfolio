import styles from "./LoadingOverlay.module.css";

export default function LoadingOverlay() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}
