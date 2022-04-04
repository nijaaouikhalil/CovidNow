import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

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

export const CasesByProvincePieChart = () => {


    const [chartData, setChartData] = useState(null);


    const sortResponseData = (data) => {
        let sortedData = {};
        sortedData.labels = [];
        sortedData.values = [];
        data.map((prov) => {
            sortedData.labels.push(prov.province);
            sortedData.values.push(prov.cases);
            return null;
        })
        return sortedData;
    };
    

    useEffect(()=> {
        const getProvinceData = async() => {
            try {
                const date = new Date();
                const dateFormatted = `${date.getDate()-1}-${date.getMonth()}-${date.getFullYear()}`;
                const response = await fetch(`https://api.opencovid.ca/timeseries?stat=cases&loc=prov&date=${dateFormatted}`);
                const json = await response.json();
                return json.cases;
            } catch (error) {
                console.log(error);
            }
        };
        const buildPieChart = (data) => {
            if(!data) {
                return setChartData(null);
            }
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

        getProvinceData().then(data => {
            buildPieChart(sortResponseData(data));
        })// eslint-disable-next-line
    }, []);
    

    if (!chartData) return null;
    return (
        <Pie
        data-testid={'doctor-pie-test'}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Active cases by province",
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