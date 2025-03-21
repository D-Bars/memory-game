import { useEffect } from "react";
import PlayerSetupPanel from "./components/PlayerSetupPanel"
import { useGameStore } from "./store/gameStore";
import { GenerateCardsArray } from "./utils/GenerateCardsArray"

function App() {
  const {isGameStart, setCards} = useGameStore();

  useEffect(() => {
    const cardArray = GenerateCardsArray();
    setCards(cardArray);
  }, []);
  return (
    <div>
      {isGameStart ? <div>Game started</div> : <PlayerSetupPanel></PlayerSetupPanel> }
    </div>
  )
}

export default App
