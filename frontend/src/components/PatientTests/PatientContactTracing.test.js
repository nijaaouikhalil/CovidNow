import { render, cleanup } from '@testing-library/react';
import { PatientContactTracing } from '../PatientContactTracing';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../store.js";


describe("Patients contact tracing form", () => {
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><PatientContactTracing /></MemoryRouter></Provider>);
    });
});
