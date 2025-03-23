import { useEffect } from 'react';
import Statistics from '../components/Statistics';
import { useStatisticsStore } from '../store/statisticStore';

const StatisticsPage = () => {
    const { stats, loadStats } = useStatisticsStore();

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