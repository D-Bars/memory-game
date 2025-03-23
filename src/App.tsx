import { useEffect } from "react";
import PlayerSetupPanel from "./components/PlayerSetupPanel"
import { useGameStore } from "./store/gameStore";
import { GenerateCardsArray } from "./utils/GenerateCardsArray"
import { Route, Routes } from 'react-router-dom';
import StatisticsPage from "./pages/StatisticsPage";
import GamePage from "./pages/GamePage";

function App() {
  const { setCards } = useGameStore();

  useEffect(() => {
    const cardArray = GenerateCardsArray();
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
