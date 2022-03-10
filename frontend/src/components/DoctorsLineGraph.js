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

    useEffect(()=> {

      const getAllCanadaData = async () => {
        const res = await fetch("https://corona.lmao.ninja/v2/historical/Canada?lastdays=120", { method: 'GET' });
        const json = await res.json();
        const cases = json.timeline.cases;
        let chart_data = {};
        chart_data.labels = [];
        chart_data.values = [];
        for (let [key, value] of Object.entries(cases)) {
            chart_data.labels.push(key);
            chart_data.values.push(value);
        };
        return chart_data;
      }; 

    const buildLineGraph = (data) => {
      const labels = data.labels;  
      const colors = generateColours(labels.length)
      setChartData({
          labels: labels,
          datasets: [{
              label: "Line Graph Data",
              backgroundColor: colors,
              borderColor: colors,
              data:  data.values,  
              fill: false,
              hoverOffset: 5
          }]
      });
    };

    getAllCanadaData().then((data)=>{
      buildLineGraph(data);
    }).catch(err => console.log(err))      
    }, []);
    

    if (!chartData) return null;
    return (
        <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
           }
          }
        }}
      />
    )
}