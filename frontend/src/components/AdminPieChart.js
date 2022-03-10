import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
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

export const AdminPieChart = ({all_users = []}) => {
    console.log(all_users)

    const [chartData, setChartData] = useState(null);


    const sortUsersByRole = () => {
        let data = {};
        data.labels = ['Admin', 'Patient', 'Doctor', 'Immigration Officer', 'Health Official'];
        data.values = [0,0,0,0,0];
        for (let i in all_users) {
            if (all_users[i].roles.name === "admin" ) data.values[0]++;
            else if (all_users[i].roles.name === "user") data.values[1]++;
            else if (all_users[i].roles.name === "doctor") data.values[2]++;
            else if (all_users[i].roles.name === "immigration_officer") data.values[3]++;
            else if (all_users[i].roles.name === "health_official") data.values[3]++;
        }
        return data;
    };
    const buildPieChart = (data) => {
        const labels = data.labels; 
        const colors = generateColours(labels.length)
        setChartData({
            labels: labels,
            datasets: [{
                label: "Pie Chart Data",
                backgroundColor: colors,
                borderColor: colors,
                data:  data.values, 
                fill: false,
                hoverOffset: 15
            }]
        });
    };
    
    useEffect(()=> {
        let data = sortUsersByRole();
        buildPieChart(data);
    }, [all_users]);
    

    if (!chartData) return null;
    return (
        <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users by role",
              font: {size: '16px'}
            },
            legend: {
              display: false,
              position: "bottom"
           }
          }
        }}
      />
    )
}