import { render, screen } from '@testing-library/react';
import { DoctorAppointment } from '../DoctorAppointment';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../store.js";


describe("Doctor message page", () => {
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><DoctorAppointment patients={[]}/></MemoryRouter></Provider>);
    });
});


