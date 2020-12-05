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

    //Converts numbers to strings and maps out where they should be inserted.
    //Whatever ID they are set to.
    document.getElementById('TotalConfirmed').textContent = (Global.TotalConfirmed).toLocaleString('en');
    document.getElementById('TotalDeaths').textContent = (Global.TotalDeaths).toLocaleString('en');
    document.getElementById('TotalRecovered').textContent = (Global.TotalRecovered).toLocaleString('en');
    document.getElementById('MortalityRate').textContent = (Number(Global.TotalDeaths)/Number(Global.TotalConfirmed) * 100).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('ActiveCases').textContent = (Number(Global.TotalConfirmed) - Number(Global.TotalDeaths + Global.TotalRecovered)).toLocaleString('en');
    document.getElementById('UpdateDate').textContent = update.substr(0,10);
    document.getElementById('UpdateTime').textContent = update.substr(11)

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



