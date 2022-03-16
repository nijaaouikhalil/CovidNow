import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const generateColours = (amount) => {
    const colours = [];
    let red = null;
    let green = null;
    let blue = null;
    for (let i = 0; i < amount; i++) {
        red = Math.floor(Math.random() * 256);  //random int between 0 and 255
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        colours.push(`rgb(${red}, ${green}, ${blue})`);
    }
    return colours;
};

function CTestScreen_AdminPieChart({ all_users = [] }) {
    console.log(all_users)

    const [chartData, setChartData] = useState(null);


    const sortUsersByRole = () => {
        let data = {};
        data.labels = ['Admin', 'Patient', 'Doctor', 'Immigration Officer', 'Health Official'];
        data.values = [0, 0, 0, 0, 0];
        for (let i in all_users) {
            switch (all_users[i].roles.name) {
                case "admin": { data.values[0]++; break; }
                case "user": { data.values[1]++; break; }
                case "doctor": { data.values[2]++; break; }
                case "immigration_officer": { data.values[3]++; break; }
                case "health_official": { data.values[4]++; break; }
                default: break;
            }
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
                data: data.values,
                fill: false,
                hoverOffset: 15
            }]
        });
    };

    useEffect(() => {
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
                        font: { size: '16px' }
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
export default CTestScreen_AdminPieChart;