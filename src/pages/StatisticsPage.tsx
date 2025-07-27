import { useEffect } from 'react';
import Statistics from '../components/Statistics';
import { useStatisticsStore } from '../store/statisticStore';
import { useMusicPlayerStore } from '../store/musicStore';

const StatisticsPage = () => {
    const { stats, loadStats } = useStatisticsStore();
    const { setPageNameTrack, setCurrentTrackEl } = useMusicPlayerStore();

    useEffect(() => {
        setPageNameTrack('statistics');
        setCurrentTrackEl();
    }, []);
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