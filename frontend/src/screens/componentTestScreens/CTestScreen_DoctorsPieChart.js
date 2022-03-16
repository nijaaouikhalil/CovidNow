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

function CTestScreen_DoctorsPieChart({ patients = [] }) {


    const [chartData, setChartData] = useState(null);


    const sortPatientsByAge = () => {
        let data = {};
        data.labels = ['10 & under', '10 -> 20', '20 -> 40', '40 -> 65', '65+'];
        data.values = [0, 0, 0, 0, 0];
        for (let i in patients) {
            patients[i].age = Math.floor((Math.random() * 81) + 10);
            if (patients[i].age <= 10) data.values[0]++;
            else if (patients[i].age <= 20) data.values[1]++;
            else if (patients[i].age <= 40) data.values[2]++;
            else if (patients[i].age <= 65) data.values[3]++;
            else data.values[4]++;
        }
        return data;
    };
    const buildPieChart = (data) => {
        const labels = data.labels;   //DUMMY LABELS
        const colors = generateColours(labels.length)
        setChartData({
            labels: labels,
            datasets: [{
                label: "Pie Chart Data",
                backgroundColor: colors,
                borderColor: colors,
                data: data.values,    //DUMMY DATA
                fill: false,
                hoverOffset: 15
            }]
        });
    };



    useEffect(() => {
        let data = sortPatientsByAge();
        buildPieChart(data);
    }, [patients]);


    if (!chartData) return null;
    return (
        <Pie
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Patients by age",
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

export default CTestScreen_DoctorsPieChart;