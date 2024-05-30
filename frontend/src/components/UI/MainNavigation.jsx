import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import styles from "./MainNavigation.module.css";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

function MainNavigation() {
  const [showModal, setShowModal] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const token = useRouteLoaderData("root");

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        setIsWide(true);
      } else {
        setIsWide(false);
      }
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth > 992) {
      setIsWide(true);
    } else {
      setIsWide(false);
    }
  }, []);

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  return (
    <nav className={styles.main_nav}>
      <div className={styles.logo}>
        <NavLink to="/home">ChristmasApp</NavLink>
      </div>

      {!isWide && (
        <div onClick={showModalHandler} className={styles.menu_burger}>
          <FiMenu />
        </div>
      )}
      {/* WIDE NAVIGATION */}
      {isWide && (
        <div className={styles.menu_nav_wide}>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
              textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
            })}
            to="/home"
          >
            Home
          </NavLink>
          {token && (
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
                textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
              })}
              to="/game"
            >
              Game
            </NavLink>
          )}
          {token && (
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
                textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
              })}
              to="/profile"
            >
              Profile
            </NavLink>
          )}
          {!token && (
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
                textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
              })}
              to="/auth?mode=login"
            >
              Login
            </NavLink>
          )}
          {token && (
            <Form action="/logout" method="post">
              <button className={styles.link_btn}>Logout</button>
            </Form>
          )}
        </div>
      )}
      {/* SMALL NAVIGATION */}
      {!isWide && (
        <div
          className={
            showModal
              ? ` ${styles.menu_nav_bar} ${styles.menu_nav_bar_show} `
              : `${styles.menu_nav_bar}`
          }
        >
          <div onClick={closeModalHandler} className={styles.close}>
            <AiOutlineClose />
          </div>
          <div className={styles.list}>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
                textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
              })}
              onClick={closeModalHandler}
              to="/home"
            >
              Home
            </NavLink>
            {token && (
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
                  textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
                })}
                onClick={closeModalHandler}
                to="/game"
              >
                Game
              </NavLink>
            )}
            {token && (
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
                  textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
                })}
                onClick={closeModalHandler}
                to="/profile"
              >
                Profile
              </NavLink>
            )}
            {!token && (
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "rgba(255, 0, 55,0.7)" : "white",
                  textShadow: isActive ? "1px 1px 1px rgba(0,0,0,0.8)" : "",
                })}
                onClick={closeModalHandler}
                to="/auth?mode=login"
              >
                Login
              </NavLink>
            )}
            {token && (
              <Form action="/logout" method="post">
                <button onClick={closeModalHandler} className={styles.link_btn}>
                  Logout
                </button>
              </Form>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
export default MainNavigation;
