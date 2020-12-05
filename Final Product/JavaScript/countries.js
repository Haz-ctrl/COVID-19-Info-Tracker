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

    const startTime = performance.now();
    
    $(document).ready(function(){
        $("select.countries").change(function(){
            const selectedCountry = $(this).children("option:selected").val();

            const url = 'https://covid.ourworldindata.org/data/owid-covid-data.json';
            const data = '';

            $.get(url, function(data, status) {
                console.log(status);

                //Mapping out what each variable is, so that they can be applied to the IDs later.
                const TotalConfirmed = (data[selectedCountry].data[data[selectedCountry].data.length - 1].total_cases).toLocaleString('en');
                const TotalDeaths = (data[selectedCountry].data[data[selectedCountry].data.length - 1].total_deaths).toLocaleString('en');
                const NewCases = (data[selectedCountry].data[data[selectedCountry].data.length - 1].new_cases).toLocaleString('en');
                const NewDeaths = (data[selectedCountry].data[data[selectedCountry].data.length - 1].new_deaths).toLocaleString('en');

                const PopulationDensity = (data[selectedCountry].population_density).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1});
                const older = (data[selectedCountry].aged_70_older).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 1});
                const CardioDeath = (data[selectedCountry].cardiovasc_death_rate).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1});
                const DiabetesPrev = (data[selectedCountry].diabetes_prevalence).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 1});
                const HospBeds = (data[selectedCountry].hospital_beds_per_thousand).toLocaleString('en', {maximumFractionDigits: 1, minimumFractionDigits: 1});
                const mortRate = ((Number(data[selectedCountry].data[data[selectedCountry].data.length - 1].total_deaths)/Number(data[selectedCountry].data[data[selectedCountry].data.length - 1].total_cases)) * 100).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2});

                //Applying variables to the inner HTML of each ID.
                //(Syntax for JQuery)
                $('#TotalConfirmed').html(TotalConfirmed);
                $('#TotalDeaths').html(TotalDeaths);
                $('#NewCases').html(NewCases);
                $('#NewDeaths').html(NewDeaths);
                $('#PopulationDensity').html(PopulationDensity);
                $('#70older').html(older);
                $('#CardioDeath').html(CardioDeath);
                $('#DiabetesPrev').html(DiabetesPrev);
                $('#HospBeds').html(HospBeds);
                $('#mortRate').html(mortRate);

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
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

            });  

            const duration = performance.now() - startTime;
            console.log(`fetchData took ${duration}ms`);
                
        });
    
    })

}