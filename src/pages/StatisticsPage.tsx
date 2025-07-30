import { useEffect } from 'react';
import Statistics from '../components/Statistics';
import { useStatisticsStore } from '../store/statisticStore';
import { useMusicPlayerStore } from '../store/musicStore';

const StatisticsPage = () => {
    const { stats, loadStats } = useStatisticsStore();
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