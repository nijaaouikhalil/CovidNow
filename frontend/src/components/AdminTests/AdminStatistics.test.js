import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminStatistics } from '../AdminStatistics';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';

describe("Admin Statistics Page", () => {

    it('Renders component without issue', () => {
        render(<AdminStatistics/>);
    });
    it('Displays zero when no users passed', () => {
        render(<AdminStatistics/>);
        const countAll = screen.getByTestId('admin-stats-count-all');
        const countConfirm = screen.getByTestId('admin-stats-count-confirm');
        const countDoctor = screen.getByTestId('admin-stats-count-doctor');
        expect(parseInt(countAll.innerHTML)).toBe(0);
        expect(parseInt(countConfirm.innerHTML)).toBe(0);
        expect(parseInt(countDoctor.innerHTML)).toBe(0);
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
        let doctors = [{name: 'testDoctor'}];
        let users_to_confirm = [ {name: 'test'} ];
        render(<Provider store={store}><MemoryRouter><AdminStatistics
            doctors={doctors} all_users={all_users} users_to_confirm={users_to_confirm}/></MemoryRouter></Provider>);
        const countAll = screen.getByTestId('admin-stats-count-all');
        const countConfirm = screen.getByTestId('admin-stats-count-confirm');
        const countDoctor = screen.getByTestId('admin-stats-count-doctor');
        expect(parseInt(countAll.innerHTML)).toBe(1);
        expect(parseInt(countConfirm.innerHTML)).toBe(1);
        expect(parseInt(countDoctor.innerHTML)).toBe(1);
    });
});
