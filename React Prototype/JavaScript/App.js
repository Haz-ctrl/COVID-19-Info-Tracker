import React from 'react';
import {Cards, Chart, Country} from './components';
import styles from './bootstrap.min.css';
import {fetchData} from './api';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }


    async componentDidMount(){
        const data = await fetchData();
        console.log(data);
        this.setState({data})
    }

    handleCountryChange = async(country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country});
    }

    render() {
        const {data} = this.state;

        return (
            <div>
                <Cards data = {data} />
                <Country handleCountryChange={this.handleCountryChange}/>
                <Chart/>
                <button type='button' class="btn btn-outline-warning btn-lg btn-block" onClick={() => window.location.reload(false)}>Refresh Statistics</button>
            </div>


        );



    }
}

export default App;