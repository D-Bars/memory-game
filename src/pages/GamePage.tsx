import { useGameStore } from '../store/gameStore';
import GameBoard from '../components/GameBoard';

const GamePage = () => {
  const { isGameStart } = useGameStore();
  return (
    <div>
      {isGameStart ? (
        <GameBoard />
      ) : (
        <h2>Game has not started yet. Please go to the setup page.</h2>
      )}
    </div>
  );
};

export default GamePage;