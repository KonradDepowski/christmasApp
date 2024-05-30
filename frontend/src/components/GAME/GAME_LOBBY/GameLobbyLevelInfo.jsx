import { Link, json } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchLevelInfo } from "../../../util/api";

import styles from "./GameLobbyLevelInfo.module.css";

const GameLobbyLevelInfo = ({ style, initialY, animateY, id }) => {
  const [levelData, setLevelData] = useState(null);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let link = `/game/game-level/${id}`;

  useEffect(() => {
    const fetchLevelInfoData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLevelInfo();
        if (data) {
          setIsLoading(false);
          setLevelData(data.data);
        }
      } catch (error) {
        json({ message: error.message });
      }
    };
    fetchLevelInfoData();
  }, []);

  useEffect(() => {
    if (levelData) {
      const data = levelData.find((item) => item.key === id);
      setData(data);
    }
  }, [levelData]);

  return (
    <motion.div
      initial={{ y: initialY, opacity: 0 }}
      animate={{ y: animateY, opacity: 1 }}
      className={`${styles.modal_game_level_info} ${style}`}
    >
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          <h2>Level {data?.level}</h2>
          <p>{data?.info}</p>
        </>
      )}
      <Link to={link}>Start</Link>
    </motion.div>
  );
};

export default GameLobbyLevelInfo;
