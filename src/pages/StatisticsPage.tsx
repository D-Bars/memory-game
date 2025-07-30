import { useEffect } from 'react';
import Statistics from '../components/Statistics';
import { useMusicPlayerStore } from '../store/musicStore';
import { useUserStatsStore } from '../store/userStatsStore';

const StatisticsPage = () => {
    const { stats, loadStats } = useUserStatsStore();
    const { setPageNameTrack, setCurrentTrackEl, isMusicOn } = useMusicPlayerStore();

    useEffect(() => {
        setPageNameTrack('statistics');
        setCurrentTrackEl();
    }, [isMusicOn]);
    useEffect(() => {
        loadStats();
    }, []);

    return (
        <div>
            <Statistics statsArray={stats} />
        </div>
    );
};

export default StatisticsPage;