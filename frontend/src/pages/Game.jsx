import { Suspense } from "react";
import GameLobby from "../components/GAME/GAME_LOBBY/GameLobby";

import LoaderSpinner from "../components/UI/LoaderSpinner";

function Game() {
  return (
    <Suspense fallback={<LoaderSpinner />}>
      <GameLobby />
    </Suspense>
  );
}
export default Game;
