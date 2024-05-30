import { json, useNavigate, useParams } from "react-router";

import { motion } from "framer-motion";

import styles from "./GameLevelInfo.module.css";
import { fetchLevelInfo } from "../../util/api";
import { useEffect, useState } from "react";
import LoaderSpinner from "../../components/UI/LoaderSpinner";

const GameLevelInfo = ({ onGoToLevel }) => {
  const { id } = useParams();
  const [levelData, setLevelData] = useState(null);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLevelInfoData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLevelInfo();
        if (data) {
          console.log(data);
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

  const naviagate = useNavigate();
  return (
    <motion.div
      initial={{ y: "-150%", x: "-50%" }}
      animate={{ y: "-50%", x: "-50%" }}
      className={styles.levelInfo}
    >
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <h2>Level {data?.level}</h2>
          <p>{data?.description}</p>
          <div className={styles.btn_container}>
            <button onClick={onGoToLevel}>Let's Go</button>
            <button onClick={() => naviagate("/game")}>I can't do this</button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default GameLevelInfo;
