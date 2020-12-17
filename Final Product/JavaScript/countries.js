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
function fetchData() {
    
    $(document).ready(function(){
        $("select.countries").change(function(){
            const selectedCountry = $(this).children("option:selected").val();
            const data = '';
            const url = 'https://covid.ourworldindata.org/data/owid-covid-data.json'

            $.ajax({
                type: 'GET',
                url: 'https://covid.ourworldindata.org/data/owid-covid-data.json',
                cache: true,
                data: {
                    format: 'json'
                },

                success: function(data) {
                    const total_cases = (data[selectedCountry].data[data[selectedCountry].data.length - 1].total_cases)

                    //Applying variables to the inner HTML of each ID.
                    //(Syntax for JQuery)
                    $('#TotalConfirmed').html((total_cases).toLocaleString('en'));
                    $('#TotalDeaths').html((data[selectedCountry].data[data[selectedCountry].data.length - 1].total_deaths).toLocaleString('en'));
                    $('#NewCases').html((data[selectedCountry].data[data[selectedCountry].data.length - 1].new_cases).toLocaleString('en'));
                    $('#NewDeaths').html((data[selectedCountry].data[data[selectedCountry].data.length - 1].new_deaths).toLocaleString('en'));
                    $('#PopulationDensity').html((data[selectedCountry].population_density).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1}));
                    $('#70older').html((data[selectedCountry].aged_70_older).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 1}));
                    $('#CardioDeath').html((data[selectedCountry].cardiovasc_death_rate).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1}));
                    $('#DiabetesPrev').html((data[selectedCountry].diabetes_prevalence).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 1}));
                    $('#HospBeds').html((data[selectedCountry].hospital_beds_per_thousand).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1}));
                    $('#mortRate').html(((Number(data[selectedCountry].data[data[selectedCountry].data.length - 1].total_deaths)/Number(data[selectedCountry].data[data[selectedCountry].data.length - 1].total_cases)) * 100).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}));
    
                    const xarray = [];
                    const yarray = [];
    
                    for (i=0; i < data[selectedCountry].data.length; i++) {
                        const date = data[selectedCountry].data[i].date
                        xarray.push(date);
    
                        const cases = data[selectedCountry].data[i].total_cases
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
                                        suggestedMax: total_cases,
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
    
                }  

                })
            }) 
    
    })

}