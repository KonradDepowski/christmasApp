import { useEffect, useState } from "react";
import image1 from "../../../assets/game/first.webp";
import image2 from "../../../assets/game/second.webp";
import image3 from "../../../assets/game/third.webp";
import image4 from "../../../assets/game/fourth.webp";
import GameLobbyLevelInfo from "./GameLobbyLevelInfo";

import { FaStar } from "react-icons/fa";

import styles from "./GameLobbyTheme.module.css";
import useFetchLevel from "../../../util/hooks/useFechLevel";
import GameCompletedResult from "../../UI/levels/GameCompletedResult";

const GameLobbyTheme = () => {
  const [levelInfo, setLevelInfo] = useState("");
  const [levelCompleted, setLevelCompleted] = useState(false);
  const levelInfoHandler = (e) => {
    setLevelInfo(e.target.id);
  };

  const level = useFetchLevel();

  useEffect(() => {
    if (level > 4) {
      setLevelCompleted(true);
    }
  }, [level]);

  return (
    <>
      <div className={styles.game_lobby_part_container}>
        {levelCompleted && <GameCompletedResult />}
        <div className={styles.game_lobby_part}>
          <link
            rel="preload"
            fetchpriority="high"
            as="image"
            href={image1}
            type="image/webp"
          />
          <img src={image1} alt="first part game lobby background" />
          {levelInfo === "first" && (
            <GameLobbyLevelInfo
              initialY={200}
              animateY={0}
              id={levelInfo}
              style={styles.level_info_first}
            />
          )}
          <div
            onClick={(e) => levelInfoHandler(e)}
            className={`${styles.highlighted_level_wrap} ${styles.first}`}
          >
            <img
              className={styles.img_gif_first}
              id="first"
              src="https://www.123gif.de/gifs/nikolaus/nikolaus-hund-zuckerstange-0068.gif"
              alt=" christmas doggy"
            />
            <span className={styles.highlighted_level_star}>
              <FaStar className={styles.level_star} />
            </span>
            <span className={styles.highlighted_level}></span>
          </div>
        </div>
        <div
          className={
            level < 4 ? styles.game_lobby_part_disabled : styles.game_lobby_part
          }
        >
          <img
            loading="lazy"
            src={image4}
            alt="second part game lobby background"
          />
          {levelInfo === "fourth" && (
            <GameLobbyLevelInfo
              initialY={-200}
              animateY={0}
              id={levelInfo}
              style={styles.level_info_second}
            />
          )}
          <div
            onClick={(e) => levelInfoHandler(e)}
            className={` ${styles.highlighted_level_wrap} ${styles.second} `}
          >
            <img
              id="fourth"
              className={styles.img_gif_first}
              src="https://www.123gif.de/gifs/schneemaenner/schneemann-0105.gif"
              alt="christmas snowman"
            />
            <span
              className={`${styles.highlighted_level_star} ${styles.second_star} `}
            >
              <FaStar className={`${styles.level_star} `} />
            </span>
            <span className={styles.highlighted_level}></span>
          </div>
        </div>
      </div>
      <div className={styles.game_lobby_part_container}>
        <div
          className={
            level < 2 ? styles.game_lobby_part_disabled : styles.game_lobby_part
          }
        >
          <img
            loading="lazy"
            src={image2}
            alt="third part game lobby background"
          />
          <div
            onClick={(e) => levelInfoHandler(e)}
            className={`${styles.highlighted_level_wrap} ${styles.third}`}
          >
            {levelInfo === "second" && (
              <GameLobbyLevelInfo
                initialY={200}
                animateY={0}
                id={levelInfo}
                style={styles.level_info_third}
              />
            )}
            <img
              id="second"
              className={styles.img_gif_first}
              src="https://www.123gif.de/gifs/weihnachtsmann/weihnachtsmann-0170.gif"
              alt="santa claus"
            />
            <span
              className={`${styles.highlighted_level_star} ${styles.third_star}`}
            >
              <FaStar className={styles.level_star} />
            </span>
            <span className={styles.highlighted_level}></span>
          </div>
        </div>
        <div
          className={
            level < 3 ? styles.game_lobby_part_disabled : styles.game_lobby_part
          }
        >
          <img
            loading="lazy"
            src={image3}
            alt="fourth part game lobby background"
          />
          <div
            onClick={(e) => levelInfoHandler(e)}
            className={`${styles.highlighted_level_wrap} ${styles.fourth}`}
          >
            {levelInfo === "third" && (
              <GameLobbyLevelInfo
                initialY={200}
                animateY={0}
                id={levelInfo}
                style={styles.level_info_fourth}
              />
            )}
            <img
              id="third"
              className={styles.img_gif_first}
              src="https://www.123gif.de/gifs/hunde/hunde-0043.gif"
              alt="christmas doggy"
            />
            <span
              className={`${styles.highlighted_level_star} ${styles.third_star} button`}
            >
              <FaStar className={styles.level_star} />
            </span>
            <span className={styles.highlighted_level}></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameLobbyTheme;
