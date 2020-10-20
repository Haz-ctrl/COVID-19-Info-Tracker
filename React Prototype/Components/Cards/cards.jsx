import { render } from '@testing-library/react';
import React from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './cards.module.css';

const Cards = ({data: {confirmed, recovered, deaths, lastUpdate}}) => {

        if (!confirmed)
        {
            return  'loading...';
        }

        return (
            <div>
                <Grid container spacing={3} justify='center'>

                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total Cases</Typography>
                            <Typography variant="h5">
                                <CountUp start = {0} end = {confirmed.value} duration = {1.5} separator = "," />
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> 
                            <Typography variant="body2">Number of active cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total Recoveries</Typography>
                            <Typography variant="h5">
                                <CountUp start = {0} end = {recovered.value} duration = {1.5} separator = "," />
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> 
                            <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start = {0} end = {deaths.value} duration = {1.5} separator = "," />
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> 
                            <Typography variant="body2">The number of deaths caused by COVID-19</Typography>
                        </CardContent>
                    </Grid>

                </Grid>
            </div>
        )
    }

export default Cards;