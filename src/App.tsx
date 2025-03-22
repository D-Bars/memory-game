import { useEffect } from "react";
import PlayerSetupPanel from "./components/PlayerSetupPanel"
import { useGameStore } from "./store/gameStore";
import { GenerateCardsArray } from "./utils/GenerateCardsArray"
import GameBoard from "./components/GameBoard";

function App() {
  const {isGameStart, setCards} = useGameStore();

  useEffect(() => {
    const cardArray = GenerateCardsArray();
    setCards(cardArray);
  }, []);
  return (
    <div>
      {isGameStart ? <GameBoard /> : <PlayerSetupPanel></PlayerSetupPanel> }
      {/* <GameBoard /> */}
    </div>
  )
}

export default App
