//global.js 
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

// This asynchronous function will fetch the global data from the url.
async function getGlobalStats() {

    // Defining the url as a separate variable makes everything look cleaner.
    const url = "https://api.covid19api.com/summary";

    // Fetch from the url, recognise it as JSON, and destructure it so that we're only looking at the 'global' part. 
    const response = await fetch(url);
    const data = await response.json();
    const {Global} = data;

    //This stores the data points inside variables so they're easier to reference.
    let update = data.Date;
    const total = Global.TotalConfirmed;
    const deaths = Global.TotalDeaths;
    const recoveries = Global.TotalRecovered;
    const active = Number(Global.TotalConfirmed) - Number(Global.TotalDeaths + Global.TotalRecovered);

    //Converts numbers to strings and maps out where they should be inserted.
    //Whatever ID they are set to.
    document.getElementById('TotalConfirmed').textContent = (total).toLocaleString('en');
    document.getElementById('TotalDeaths').textContent = (deaths).toLocaleString('en');
    document.getElementById('TotalRecovered').textContent = (recoveries).toLocaleString('en');
    document.getElementById('MortalityRate').textContent = (Number(Global.TotalDeaths)/Number(Global.TotalConfirmed) * 100).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('ActiveCases').textContent = (active).toLocaleString('en');
    document.getElementById('UpdateDate').textContent = update.substr(0,10);
    document.getElementById('UpdateTime').textContent = update.substr(11)

    //Creates a dougnut chart using Chart.js which divides up each section by percentage of total cases.
    const doughnutChart = new Chart(globalChart, {
        //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        type: 'doughnut', 
        data: {
            datasets: [{
                label: 'People',
                data: [active, deaths, recoveries],
                backgroundColor: [
                '#00FFFF', '#EE82EE', '#83F52C'
            ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Active Global Cases',
                'Global Deaths',
                'Global Recoveries'
            ],
            
        },

        //This will allow a user to hover over 
        options: {
            legend: {
                labels: {
                    fontSize: 14
                }
            },
            animation: {
                animateScale: true,
            },
            cutoutPercentage: 55,
            plugins: {
                datalabels: {
                    formatter: (value, globalChart) => {
                        var sum = 0;
                        var dataArr = globalChart.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        })
                        var percentage = (value*100/sum).toFixed(2)+'%';
                        return percentage;
                    },
                    color: '#000000',
                    
                }
                
            }

        }

    })
    
}



