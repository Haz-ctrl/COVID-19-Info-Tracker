import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './chart.module.css';

const Chart = () => {
    const[DailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async() => {
            const DailyData = await fetchDailyData();
        }

        console.log(DailyData);

        fetchAPI();
    });

    const linechart = (
        DailyData.length ? (
            <Line
                data={{
                    labels: DailyData.map(({date}) => date),
                    datasets: [{
                        data: DailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: DailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.9)',
                        fill: true,
                    }],
                }}
            /> ): null
    );
        return (
            <div className={styles.container}>
                {linechart}
            </div>
        )
    }

export default Chart;