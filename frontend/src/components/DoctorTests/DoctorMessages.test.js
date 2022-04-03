import { render, screen } from '@testing-library/react';
import { DoctorMessages } from '../DoctorMessages';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../store.js";


describe("Doctor message page", () => {
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><DoctorMessages patients={[]}/></MemoryRouter></Provider>);
    });
    it('renders 0 rows when no patients given ', () => {
        render(<MemoryRouter><DoctorMessages patients={[]}/></MemoryRouter>)
        const rows = screen.queryAllByTestId('doctor-message-item');
       expect(rows.length).toBe(0);
    });
    it('renders 4 rows from default messsages in table ', () => {
        const patients = [{
            _id: 123,
            name: "testName"
        }]
        render(<MemoryRouter><DoctorMessages patients={patients}/></MemoryRouter>)
        const rows = screen.getAllByTestId('doctor-message-item');
       expect(rows.length).toBe(4);
    });
});


