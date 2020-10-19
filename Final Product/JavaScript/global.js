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

    let update = data.Date;

    // As always, these help to define what each statistic is. Numerical operators can be used.
    // .toLocaleString is useful for large numbers like these, becase when they get converted to strings, commas are put after every 3 digits to make numbers more readable.
    document.getElementById('TotalConfirmed').textContent = (Global.TotalConfirmed).toLocaleString('en');
    document.getElementById('TotalDeaths').textContent = (Global.TotalDeaths).toLocaleString('en');
    document.getElementById('TotalRecovered').textContent = (Global.TotalRecovered).toLocaleString('en');
    document.getElementById('MortalityRate').textContent = (Number(Global.TotalDeaths)/Number(Global.TotalConfirmed) * 100).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('ActiveCases').textContent = (Number(Global.TotalConfirmed) - Number(Global.TotalDeaths + Global.TotalRecovered)).toLocaleString('en');
    document.getElementById('LastUpdate').textContent = update.substr(0,10);
    
}

// This asynchronous function will initialise and draw the doughnut chart using the chart.js library
async function chartinit() {

    await getGlobalStats();

    // Fetch from the url, recognise it as JSON, and destructure it so that we're only looking at the 'global' part. 
    const response = await fetch("https://api.covid19api.com/summary");
    const data = await response.json();
    const {Global} = data;

    const doughnutChart = new Chart(globalChart, {
        //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        type: 'doughnut', 
        data: {
            datasets: [{
                label: 'People',
                data: [Number(Global.TotalConfirmed) - Number(Global.TotalDeaths + Global.TotalRecovered), Global.TotalDeaths, Global.TotalRecovered],
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
        options: {}

    })
}