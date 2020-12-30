//countries.js
//Hashim I.

// Set the width of the side navigation to 250px. 60% Opacity
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.6)";
}
  
// Set the width of the side navigation to 0. Return background color to normal
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "#222";
    document.getElementById("menu").src = "sidenav1.jpg"; 
}

//Breaking my own rules here, and using JQuery to get the current value of weather.
async function changeCountry() {

    //Break the problem up into smaller bits to reduce lag and waiting times.

    //This will fetch the timeseries statistics, which will aid in constructing the chart.
    const baseurl = 'https://pomber.github.io/covid19/timeseries.json';
    const baseresponse = await fetch(baseurl);
    const basedata = await baseresponse.json();

    //This will fetch the new cases and new deaths statistics, which will aid in
    const extendedurl = 'https://api.covid19api.com/summary';
    const extendedresponse = await fetch(extendedurl);
    const extendeddata = await extendedresponse.json();

    //This will fetch the stats from the local file in the directory.
    //NOTE: THIS WILL ONLY WORK WHEN RUNNING THE SERVER, NOT THE FILE.
    const localresponse = await fetch('countries.json');
    const localdata = await localresponse.json();
    
    console.log(localdata);
    console.log(basedata);
    console.log(extendeddata);

    $(document).ready(function(){
        $("select.countries").change(function(){
            const countryCode = $(this).children("option:selected").val();
            const countryName = $(this).children("option:selected").text();
            const element = $(this).children("option:selected").data('element')

            //Applying variables to the inner HTML of each ID.
            //(Syntax for JQuery)

            //This is derived from the base fetch
            $('#TotalConfirmed').html((basedata[countryName][basedata[countryName].length - 1].confirmed).toLocaleString('en'));
            $('#TotalDeaths').html((basedata[countryName][basedata[countryName].length - 1].deaths).toLocaleString('en'));

            //This is derived from the extended fetch
            $('#NewCases').html((extendeddata.Countries[element].NewConfirmed).toLocaleString('en'));
            $('#NewDeaths').html((extendeddata.Countries[element].NewDeaths).toLocaleString('en'));

            //This is derived from local file fetch 
            $('#PopulationDensity').html((localdata[countryCode].population_density).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1}));
            $('#70older').html((localdata[countryCode].aged_70_older).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1}));
            $('#CardioDeath').html((localdata[countryCode].cardiovasc_death_rate).toLocaleString('en', {maximumFractionDigits: 0, minimumFractionDigits: 0}));
            $('#DiabetesPrev').html((localdata[countryCode].diabetes_prevalence).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}));
            $('#HospBeds').html((localdata[countryCode].hospital_beds_per_thousand).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1}));
            $('#mortRate').html(((Number(basedata[countryName][basedata[countryName].length - 1].deaths) / Number(basedata[countryName][basedata[countryName].length - 1].confirmed)) * 100).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}));

            const xarray = [];
            const yarray = [];

            for (i=0; i < basedata[countryName].length; i++) {
                const date = basedata[countryName][i].date;
                xarray.push(date);

                const cases = basedata[countryName][i].confirmed;
                yarray.push(cases);
            }

            const myChart = new Chart(countryChart, {
                type: 'line',
                data: {
                    labels: xarray,
                    datasets: [{
                        label: 'Total Cases over time',
                        data: yarray,
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 4
                        
                    }]
                },
                options: {
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Date',
                                fontSize: 16,
                                fontColor: '#ffffff'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of cases',
                                fontSize: 16,
                                fontColor: '#ffffff'
                            },
                            ticks: {
                                suggestedMin: 0,
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
    
                  

        })
    
    })

}