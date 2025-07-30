export const getMusicBackgroundArray = () => {
    const srcToBackgroundMusic = '/sounds/background/'

    return {
        statistics: `${srcToBackgroundMusic}statisticsPage.wav`,
        setup: `${srcToBackgroundMusic}setupPage.wav`,
        game: `${srcToBackgroundMusic}gamePage.wav`,

        win: `${srcToBackgroundMusic}victory.mp3`,
        loss: `${srcToBackgroundMusic}loss.mp3`
    }
};