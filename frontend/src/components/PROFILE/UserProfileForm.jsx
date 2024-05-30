import { motion } from "framer-motion";
import styles from "./UserProfileForm.module.css";
import { Form, useActionData } from "react-router-dom";
function UserProfileForm() {
  const errors = useActionData();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
    >
      <Form method="PATCH" className={styles.profile_form}>
        <div className={styles.input_container}>
          <label>
            <input type="text" name="name" placeholder="Your name" />
            {errors?.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </label>
          <label>
            <input type="email" name="email" placeholder="Email" />
            {errors?.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>
          <label>
            <input type="number" name="age" placeholder="Your age" />
            {errors?.age && <span className={styles.error}>{errors.age}</span>}
          </label>
        </div>
        <h3>Choose new avatar</h3>
        <div className={styles.avatar_container}>
          <label htmlFor="firstAvatar">
            <input
              type="radio"
              id="firstAvatar"
              name="avatar"
              className={styles.checkbox}
              value={1}
            />
            <div className={`${styles.option_inner} ${styles.first}`}></div>
          </label>
          <label htmlFor="secondAvatar">
            <input
              type="radio"
              id="secondAvatar"
              name="avatar"
              className={styles.checkbox}
              value={2}
            />
            <div className={`${styles.option_inner} ${styles.second}`}></div>
          </label>
          <label htmlFor="thirdAvatar">
            <input
              type="radio"
              id="thirdAvatar"
              name="avatar"
              className={styles.checkbox}
              value={3}
            />
            <div className={`${styles.option_inner} ${styles.third}`}></div>
          </label>
          <label htmlFor="fourthAvatar">
            <input
              type="radio"
              id="fourthAvatar"
              name="avatar"
              className={styles.checkbox}
              value={4}
            />
            <div className={`${styles.option_inner} ${styles.fourth}`}></div>
          </label>
          <label htmlFor="fifthAvatar">
            <input
              type="radio"
              id="fifthAvatar"
              name="avatar"
              className={styles.checkbox}
              value={5}
            />
            <div className={`${styles.option_inner} ${styles.fifth}`}></div>
          </label>
        </div>
        {errors?.avatar && (
          <span className={styles.error}>{errors.avatar}</span>
        )}
        <button className={styles.btn_submit_profileForm}>Update</button>
      </Form>
    </motion.div>
  );
}
export default UserProfileForm;
