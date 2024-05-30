import { useLoaderData } from "react-router";
import styles from "./Welcome.module.css";
import { motion } from "framer-motion";
function Welcome() {
  const token = useLoaderData();

  return (
    <section className={styles.welcome_section}>
      <motion.header
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h1>Welcome to Christmas Game</h1>
        {!token && <p>Login to the app and feel magic of Christmas </p>}
        {token && (
          <p>Feel the magic of Chrimstas and visit Chrismtas landing</p>
        )}
      </motion.header>
    </section>
  );
}
export default Welcome;
