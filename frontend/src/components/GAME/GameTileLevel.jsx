import { useState } from "react";
import { useParams } from "react-router";
import GameLevelInfo from "./GameLevelInfo";
import LevelFirst from "./LEVELS/LEVEL_FIRST/LevelFirst";
import LevelSecond from "./LEVELS/LEVEL_SECOND/LevelSecond";
import LevelThird from "./LEVELS/LEVEL_THIRD/LevelThird";
import LevelFourth from "./LEVELS/LEVEL_FORURTH/LevelFourth";

import styles from "./GameTileLevel.module.css";

const GameTileLevel = () => {
  const [showGameLevel, setShowGameLevel] = useState(false);
  const { id } = useParams();
  let content;
  if (id === "first") {
    content = <LevelFirst />;
  } else if (id === "second") {
    content = <LevelSecond />;
  } else if (id === "third") {
    content = <LevelThird />;
  } else if (id === "fourth") {
    content = <LevelFourth />;
  }

  return (
    <div className={styles.level}>
      {!showGameLevel && (
        <GameLevelInfo onGoToLevel={() => setShowGameLevel(true)} />
      )}
      {showGameLevel && content}
    </div>
  );
};

export default GameTileLevel;
