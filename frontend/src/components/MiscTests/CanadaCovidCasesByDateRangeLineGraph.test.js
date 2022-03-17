import { render, screen } from '@testing-library/react';
import { CanadaCovidCasesByDateRangeLineGraph } from '../CanadaCovidCasesByDateRangeLineGraph';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../store.js";


describe("Canada covid cases by date range line graph page", () => {
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><CanadaCovidCasesByDateRangeLineGraph /></MemoryRouter></Provider>);
    });
    it('Should not render graph as not connected to api', () => {
        render(<Provider store={store}><MemoryRouter><CanadaCovidCasesByDateRangeLineGraph /></MemoryRouter></Provider>)
        const startDate = screen.queryByTestId('covid-cases-start-date');
        expect(startDate).toBeNull();
    });
});

