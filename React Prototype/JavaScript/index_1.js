import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {

    let changeableurl = url;

    if(country) {
        changeableurl = `${url}/countries/${country}`;
    }

    try {
        const {data} = await axios.get(url);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }

        return modifiedData;
    }

    catch(error)
    {
        console.log(error);
    }
}

export const fetchDailyData = async (country) => {


    try {
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((DailyData) => ({
            confirmed: DailyData.confirmed.total,
            deaths: DailyData.deaths.total,
            date: DailyData.reportDate,
        }));

        return modifiedData;
    }
    
    catch(error) {

    }

    }

export const fetchCountries = async() => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name);
    }

    catch(error) {
        console.log(error);
    }
}

