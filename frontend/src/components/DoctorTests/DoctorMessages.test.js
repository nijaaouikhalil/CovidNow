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
        render(<Provider store={store}><MemoryRouter><DoctorMessages patients={[]}/></MemoryRouter></Provider>)
        const rows = screen.queryAllByTestId('doctor-message-item');
       expect(rows.length).toBe(0);
    });
    it('renders warning message when there are no messages for doctor ', () => {
        const patients = [{
            _id: 123,
            name: "testName"
        }]
        render(<Provider store={store}><MemoryRouter><DoctorMessages patients={patients}/></MemoryRouter></Provider>)
        const message = screen.getAllByText('No messages yet');
        expect(message).not.toBeNull();
    });
});


