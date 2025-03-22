import CardsList from './CardsList';
import cl from './styles/GameBoard.module.scss';

const GameBoard = () => {
  return (
    <div className={cl.game_board}>
        <CardsList />
        <div className={cl.game_stats_panel}>
            
        </div>
    </div>
  );
};
export default GameBoard;