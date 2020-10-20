import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl, StylesProvider, createStyles} from '@material-ui/core';

import styles from './country.module.css';

import {fetchCountries, fetchedCountries} from '../../api';

const Country = ({handleCountryChange}) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries] )

    console.log(fetchedCountries);

    return (
        <FormControl className={styles.FormControl}>
            <NativeSelect  defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
                <option value='global'>Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default Country;