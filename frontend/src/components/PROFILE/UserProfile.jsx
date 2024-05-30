import styles from "./UserProfile.module.css";
import { HiMiniArrowSmallDown } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import UserProfileForm from "./UserProfileForm";
import { getImage } from "../../util/data";
import { useActionData, useLoaderData } from "react-router";
import { fetchUserProfile } from "../../util/api";
function UserProfile() {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const data = useLoaderData();
  const errors = useActionData();

  function showUpdateFormHandler() {
    setShowUpdateForm((prev) => !prev);
  }
  useEffect(() => {
    if (errors) {
      return;
    } else {
      setShowUpdateForm(false);
    }
  }, [data]);

  return (
    <section className={styles.userProfile}>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
      >
        <div className={styles.userInfo}>
          <div className={styles.person_data}>
            <p className={styles.name}>{data ? data.name : ""}</p>
            <p>{data ? data.email : ""}</p>
            <p>Wiek: {data ? data.age : ""}</p>
          </div>
          <div className={styles.avatar}>
            <img
              src={getImage(parseInt(data === null ? "" : data.avatar))}
              alt="avatar"
            />
          </div>
        </div>
        <button
          onClick={showUpdateFormHandler}
          className={styles.btn_userProfile}
        >
          <motion.span animate={{ rotate: showUpdateForm ? 180 : 0 }}>
            <HiMiniArrowSmallDown className={styles.btn_icon} />
          </motion.span>
          Update user data
          <motion.span animate={{ rotate: showUpdateForm ? 180 : 0 }}>
            <HiMiniArrowSmallDown className={styles.btn_icon} />
          </motion.span>
        </button>
        <AnimatePresence>
          {showUpdateForm && <UserProfileForm />}
        </AnimatePresence>
      </motion.header>
    </section>
  );
}
export default UserProfile;

export async function loader() {
  return fetchUserProfile();
}
