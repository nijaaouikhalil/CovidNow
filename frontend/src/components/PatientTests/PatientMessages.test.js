import { render, screen } from '@testing-library/react';
import { PatientMessages } from '../PatientMessages';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../store.js";


describe("Patients messages", () => {
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><PatientMessages /></MemoryRouter></Provider>);
    });
    it('renders 4 rows in table ', () => {
        render(<MemoryRouter><PatientMessages /></MemoryRouter>)
        const rows = screen.getAllByTestId('patient-message-row');
        expect(rows.length).toBe(4);
    });
});



