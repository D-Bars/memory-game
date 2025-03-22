import CardsList from './CardsList';
import GameStatsPanel from './GameStatsPanel';
import cl from './styles/GameBoard.module.scss';

const GameBoard = () => {
  return (
    <div className={cl.game_board}>
        <CardsList />
        <GameStatsPanel />
    </div>
  );
};
export default GameBoard;