import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const generateColours = (amount) => {
  const colours = [];
  let red = null;
  let green = null;
  let blue = null;
  for (let i = 0; i < amount; i++){
      red = Math.floor(Math.random() * 256);  //random int between 0 and 255
      green = Math.floor(Math.random() * 256);
      blue = Math.floor(Math.random() * 256);
      colours.push(`rgb(${red}, ${green}, ${blue})`);
  }
  return colours;
};

const generateGrayScaleColours = (amount) => {
  const colours = [];
  let val = null;
  for (let i = 0; i < amount; i++){
      val = Math.floor((Math.random() * 25)+1) * 10;  //random int between 1 and 25 * 10
      colours.push(`rgb(${val}, ${val}, ${val})`);
  }
  return colours;
};

export const DoctorsLineGraph = () => {


    const [chartData, setChartData] = useState(null);
    const [afterDate, setAfterDate] = useState('2020-01-01');
    const [beforeDate, setBeforeDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(()=> {
      const getAllCanadaData = async () => {
        const response = await fetch(`https://api.opencovid.ca/summary?loc=canada&after=${afterDate}&before=${beforeDate}`, {method: "GET"});
        const json = await response.json();
        let api_graph_data = json.summary;
        let graph_results = {};
        graph_results.labels = [];
        graph_results.active_cases = [];

        for (let item in api_graph_data) {
          const day = api_graph_data[item].date.substr(0,2);
          const month = api_graph_data[item].date.substr(3,2);
          const year = api_graph_data[item].date.substr(6,4);
          const date = `${month}-${day}-${year}`;
          api_graph_data[item].date = date;
  
          graph_results.labels.push(date);
          graph_results.active_cases.push(api_graph_data[item].active_cases);
        }
        return graph_results;
      }; 

    const buildLineGraph = (data) => {
      const labels = data.labels;  
      const colors = generateColours(labels.length)
      setChartData({
          labels: labels,
          datasets: [{
              label: "Confirmed Covid-19 Cases",
              backgroundColor: colors,
              borderColor: colors,
              data:  data.active_cases,  
              fill: false,
              hoverOffset: 5
          }]
      });
    };

    getAllCanadaData().then((data)=>{
      buildLineGraph(data);
    }).catch(err => console.log(err))      
    }, [afterDate, beforeDate]);
    

    if (!chartData) return <h4>API data currently unavailable</h4>;
    return (
      <div>
        <Line
          id='doctor-line-chart'
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
            }
            }
          }}
        />
        <div id='doctor-graph-dates'>
          <label htmlFor="">From: </label>
          <input type="date" onChange={(e) => setAfterDate(e.target.value)} defaultValue={afterDate} />
          <label htmlFor="">To: </label>
          <input type="date" onChange={(e) => setBeforeDate(e.target.value)} value={beforeDate} />
        </div>

      </div>
        
    )
}