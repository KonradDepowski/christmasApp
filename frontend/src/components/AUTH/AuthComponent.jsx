import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styles from "./AuthComonent.module.css";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
function AuthComponent() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const errors = useActionData();
  const navigation = useNavigation();

  let content;
  if (navigation.state === "submitting") {
    content = "Submmiting...";
  } else if (isLogin) {
    content = "Login";
  } else {
    content = "Sign up";
  }

  return (
    <section className={styles.auth_section}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.6rem",
          },
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={styles.auth_form_container}
      >
        <Form className={styles.auth_form} method="post">
          <h1>Login</h1>
          <label>
            <input type="text" name="email" placeholder="E-mail" />
            {errors?.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>
          <label>
            <input type="password" name="password" placeholder="Password" />
            {errors?.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </label>
          <button
            disabled={navigation.state === "submitting" ? true : false}
            className={styles.submit}
          >
            {content}
          </button>
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className={styles.btn}
            type="button"
          >
            {isLogin ? "Create new account" : "Login with existing acoount"}
          </Link>
        </Form>
      </motion.div>
    </section>
  );
}
export default AuthComponent;
