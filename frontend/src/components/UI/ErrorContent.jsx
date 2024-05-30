import styles from "./ErrorContent.module.css";
function ErrorContent({ title, message }) {
  return (
    <div className={styles.error}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
export default ErrorContent;
