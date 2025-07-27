import CardsList from './CardsList';
import GameStatsPanel from './GameStatsPanel';
import EndGameModal from './EndGameModal';
import cl from './styles/GameBoard.module.scss';

const GameBoard = () => {
  return (
    <div className={cl.game_board}>
        <CardsList />
        <GameStatsPanel />
        <EndGameModal/>
    </div>
  );
};
export default GameBoard;