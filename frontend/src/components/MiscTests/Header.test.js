import { render, cleanup } from '@testing-library/react';
import { Header } from '../Header';
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import store from "../../store.js";
import { MemoryRouter } from 'react-router-dom';


describe("Header component", () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><Header /></MemoryRouter></Provider>);
    });
});
