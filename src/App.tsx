import { useEffect } from "react";
import PlayerSetupPanel from "./pages/PlayerSetupPanel"
import { useGameStore } from "./store/gameStore";
import { GenerateImagesCardsArray } from "./utils/cardsArray/GenerateImagesCardsArray"
import { Route, Routes } from 'react-router-dom';
import StatisticsPage from "./pages/StatisticsPage";
import GamePage from "./pages/GamePage";

function App() {
  const { setCards } = useGameStore();

  useEffect(() => {
    const cardArray = GenerateImagesCardsArray();
    setCards(cardArray);
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<PlayerSetupPanel />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </div>
  )
}

export default App
