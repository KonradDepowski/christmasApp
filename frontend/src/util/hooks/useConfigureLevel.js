import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { checkResultGameLevel } from "../api";

const useConfigureLevel = (data, gameResultProp) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [gameOver, setGameIsOver] = useState(false);
  const [gameResult, setGameResult] = useState(false);
  const navigate = useNavigate();
  const showModalHandler = (e) => {
    setShowModal(true);
    setTaskId(e.target.id);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const endGameHandler = () => {
    if (gameResultProp ? gameResultProp : gameResult) {
      navigate("/game");
    } else {
      setGameIsOver(false);
    }
  };

  useEffect(() => {
    const checkResultGame = async () => {
      if (data?.length > 1) {
        const isAllFill = data?.every(
          (item) => item.value !== "" && item.value !== "♬"
        );
        if (isAllFill) {
          setIsLoading(true);
          const dataResult = await checkResultGameLevel("second", data);

          if (dataResult.result === true) {
            setIsLoading(false);
            setGameIsOver(true);
            setGameResult(true);
          } else {
            setIsLoading(false);
            setGameIsOver(true);
            setGameResult(false);
          }
        }
      }
    };
    checkResultGame();
  }, [data]);

  return {
    showModal,
    taskId,
    gameOver,
    gameResult,
    showModalHandler,
    closeModalHandler,
    endGameHandler,
    setGameIsOver,
    isLoading,
  };
};

export default useConfigureLevel;
