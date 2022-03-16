import React, { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import store from "../../store.js";
import { AdminPieChart } from '../AdminPieChart';

describe("Admin Pie Chart sort users", () => {
    it('Renders component without issue', () => {
        render(<Provider store={store}><MemoryRouter><AdminPieChart all_users={[]}/></MemoryRouter></Provider>);
    });
    it('Chart not displayed if no users passed', async () => {
        const { container } = render(<Provider store={store}><MemoryRouter><AdminPieChart all_users={[]}/></MemoryRouter></Provider>);
        expect(container.childElementCount).toEqual(0);
    });
    it('Chart displayed if users passed', async () => {
        let all_users = [
            {
                _id: "testId",
                name: 'testName',
                lname: 'testLName',
                email: 'test@email',
                count: 29,
                roles: {name:'admin'},
                covidStatus: 'negative',
                your_doctor: {name: "testDoctorName"}
            }
        ]
        const { container } = render(<Provider store={store}><MemoryRouter><AdminPieChart all_users={all_users}/></MemoryRouter></Provider>);
        expect(container.childElementCount).toEqual(1);
    });
});
