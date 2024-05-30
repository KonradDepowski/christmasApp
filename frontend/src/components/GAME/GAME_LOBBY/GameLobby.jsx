import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import LoaderSpinner from "../../UI/LoaderSpinner";
import GameLobbyTheme from "./GameLobbyTheme";

import { IoEnterOutline } from "react-icons/io5";
import { useDraggable } from "react-use-draggable-scroll";

import styles from "./GameLobby.module.css";
import useFetchLevel from "../../../util/hooks/useFechLevel";

function GameLobby() {
  const ref = useRef();
  const naviagte = useNavigate();
  const [levelCompleted, setLevelCompleted] = useState(false);
  const { events } = useDraggable(ref, { safeDisplacement: 11 });
  const [eventsMode, setEventsMode] = useState(events);

  const quitGameHandler = () => {
    naviagte("/home");
  };

  const level = useFetchLevel();

  useEffect(() => {
    if (level > 4) {
      setLevelCompleted(true);
      setEventsMode(null);
    }
  }, [level]);

  const style = levelCompleted ? "hidden" : "auto";

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Outlet />
      <div
        ref={ref}
        {...eventsMode}
        className={styles.game}
        style={{ overflow: style }}
      >
        <div onClick={quitGameHandler} className={styles.quit_game}>
          <IoEnterOutline className={styles.icon} />
        </div>
        <GameLobbyTheme />
      </div>
    </Suspense>
  );
}
export default GameLobby;
