import styles from "./LoaderSpinner.module.css";

const LoaderSpinner = ({ style, title = "Loading" }) => {
  return (
    <div className={`${style} ${styles.container} `}>
      <div className={styles["custom-loader"]}></div>
      <h1 className={styles.title}>{title}...</h1>
    </div>
  );
};

export default LoaderSpinner;
