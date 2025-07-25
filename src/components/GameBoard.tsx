import CardsList from './CardsList';
import GameStatsPanel from './GameStatsPanel';
import ModalWindow from './ModalWindow';
import cl from './styles/GameBoard.module.scss';

const GameBoard = () => {
  return (
    <div className={cl.game_board}>
        <CardsList />
        <GameStatsPanel />
        <ModalWindow/>
    </div>
  );
};
export default GameBoard;