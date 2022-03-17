import React from 'react';
import { render } from '@testing-library/react';
import { AdminConfirmUsers } from '../AdminConfirmUsers';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import store from "../../store.js";

describe("Table displaying all new users to be confirmed in admin panel", () => {
    it('renders without crashing', () => {
        render(<Provider store={store}><MemoryRouter><AdminConfirmUsers /></MemoryRouter></Provider>);
    });
});
