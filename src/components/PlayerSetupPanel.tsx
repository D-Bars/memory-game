import cl from './styles/PlayerSetupPanel.module.scss';

const PlayerSetupPanel = () => {
    return (
        <div className={cl.body}>
            <div className={cl.body_mask}></div>
            <div className={cl.window_container}>
                <h2>Welcome to the memory game!</h2>
                <div className={cl.window_options_box}>
                    <div className={cl.user_name_box}>
                        <input id='userName' type="text" placeholder=''/>
                        <label htmlFor="userName">Nickname</label>
                    </div>
                    <h3>select difficulty level</h3>
                    <div className={cl.levels_box}>
                        <div className={cl.level}>hard</div>
                        <div className={cl.level}>medium</div>
                        <div className={cl.level}>easy</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PlayerSetupPanel;