import { useEffect, useState } from "react";
import { checkUserProgress } from "../api";
import { json } from "react-router";

const useFetchLevel = () => {
  const [level, setLevel] = useState(null);
  useEffect(() => {
    const userProggressHandler = async () => {
      try {
        const data = await checkUserProgress();
        if (data) {
          setLevel(data.level);
        }
      } catch (error) {
        json({ message: error.message });
      }
    };

    userProggressHandler();
  }, []);

  return level;
};

export default useFetchLevel;
