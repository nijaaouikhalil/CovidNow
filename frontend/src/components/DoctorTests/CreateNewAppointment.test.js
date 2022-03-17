import { render, screen } from '@testing-library/react';
import { CreateNewAppointment } from '../CreateNewAppointment';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../store.js";


describe("Doctor create new appointment page", () => {
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><CreateNewAppointment patients={[]}/></MemoryRouter></Provider>);
    });
});


