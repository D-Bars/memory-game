import { useEffect } from "react";
import PlayerSetupPanel from "./pages/PlayerSetupPanel"
import { useGameStore } from "./store/gameStore";
import { GenerateImagesCardsArray } from "./utils/cardsArray/GenerateImagesCardsArray"
import { Route, Routes } from 'react-router-dom';
import StatisticsPage from "./pages/StatisticsPage";
import GamePage from "./pages/GamePage";
import WindowChooseOption from "./components/UI/WindowChooseOption/WindowChooseOption"
import { useMusicPlayerStore } from "./store/musicStore";

function App() {
  const { setInitialCardsArray } = useGameStore();
  const { setIsMusicOn } = useMusicPlayerStore();

  useEffect(() => {
    const cardArray = GenerateImagesCardsArray();
    setInitialCardsArray(cardArray);
  }, []);

  const modalOptions = {
    'yes': true,
    'no': false
  }

  const setMusicEnabled = (val:boolean) => {
    setIsMusicOn(val);
  }

  return (
    <>
      <WindowChooseOption
        title="Turn on background music?"
        optionTextArr={modalOptions}
        hasMask={true}
        onClick={setMusicEnabled}
      />
      <Routes>
        <Route path="/" element={<PlayerSetupPanel />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </>
  )
}

export default App
