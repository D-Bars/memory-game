import { useEffect } from "react";
import PlayerSetupPanel from "./components/PlayerSetupPanel"
import { useGameStore } from "./store/gameStore";
import { GenerateCardsArray } from "./utils/GenerateCardsArray"

function App() {
  useEffect(() => {
    const cardArray = GenerateCardsArray();
    useGameStore.getState().setCards(cardArray);
  }, []);
  return (
    <div>
      <PlayerSetupPanel></PlayerSetupPanel>
    </div>
  )
}

export default App
