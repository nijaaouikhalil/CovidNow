import React, { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import store from "../../store.js";
import { AdminStatistics } from '../AdminStatistics';

describe("Admin Statistics Page", () => {
    it('Renders component without issue', () => {
        render(<Provider store={store}><MemoryRouter><AdminStatistics all_users={[]}/></MemoryRouter></Provider>);
    });
    it('Displays zero in counts if no users passed', async () => {
        const { container } = render(<Provider store={store}><MemoryRouter><AdminStatistics all_users={[]}/></MemoryRouter></Provider>);
        expect(container.childElementCount).toEqual(0);
    });
    it('Displays correct counts if users passed', async () => {
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
        ];

        let users_to_confirm = [ {name: 'test'} ];
        const { queryByTestId } = render(<Provider store={store}><MemoryRouter><AdminStatistics all_users={all_users} users_to_confirm={users_to_confirm}/></MemoryRouter></Provider>);
        const countAll = queryByTestId('admin-stats-count-all');

    });
});
